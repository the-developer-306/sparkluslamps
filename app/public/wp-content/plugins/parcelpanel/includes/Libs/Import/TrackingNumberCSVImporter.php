<?php

namespace ParcelPanel\Libs\Import;

use Automattic\WooCommerce\Utilities\NumberUtil;
use Exception;
use ParcelPanel\Action\Common;
use ParcelPanel\Action\ShopOrder;
use ParcelPanel\Api\Api;
use ParcelPanel\Libs\ArrUtils;
use ParcelPanel\Models\Table;
use ParcelPanel\ParcelPanelFunction;

class TrackingNumberCSVImporter
{
    /**
     * Tracks current row being parsed.
     *
     * @var integer
     */
    protected $parsing_raw_data_index = 0;

    /**
     * CSV file.
     *
     * @var string
     */
    protected $file = '';

    /**
     * Total lines without header
     *
     * @var int
     */
    protected $lines = 0;
    protected $spaces = 0;

    /**
     * The file position after the last read.
     *
     * @var int
     */
    protected $file_position = 0;

    /**
     * Importer parameters.
     *
     * @var array
     */
    protected $params = [];

    /**
     * Raw keys - CSV raw headers.
     *
     * @var array
     */
    protected $raw_keys = [];

    /**
     * Mapped keys - CSV headers.
     *
     * @var array
     */
    protected $mapped_keys = [];

    /**
     * Raw data.
     *
     * @var array
     */
    protected $raw_data = [];

    /**
     * Raw data.
     *
     * @var array
     */
    protected $file_positions = [];

    /**
     * Parsed data.
     *
     * @var array
     */
    protected $parsed_data = [];

    /**
     * Start time of current import.
     *
     * (default value: 0)
     *
     * @var int
     */
    protected $start_time = 0;

    private $order_id = 0;
    private $tracking_items = [];

    /**
     * 初始化导入器
     *
     * @param string $file File to read.
     * @param array $params Arguments for the parser.
     */
    public function __construct(string $file, array $params = [])
    {

        $default_args = [
            'skip' => 0,  // 跳过读取的行数
            'lines' => -1,  // Max lines to read.
            'mapping' => [],  // Column mapping. csv_heading => schema_heading.
            'parse' => false,  // Whether to sanitize and format data.
            'update_existing' => false,  // Whether to update existing items.
            'delimiter' => ',',  // CSV delimiter.
            'prevent_timeouts' => true,  // Check memory and time usage and abort if reaching limit.
            'enclosure' => '"',  // The character used to wrap text in the CSV.
            'escape' => "\0",  // PHP uses '\' as the default escape character. This is not RFC-4180 compliant. This disables the escape character.
        ];

        $this->params = wp_parse_args($params, $default_args);
        $this->file = $file;

        // if ( isset( $this->params[ 'mapping' ][ 'from' ], $this->params[ 'mapping' ][ 'to' ] ) ) {
        //     $this->params[ 'mapping' ] = array_combine( $this->params[ 'mapping' ][ 'from' ], $this->params[ 'mapping' ][ 'to' ] );
        // }

        // Import mappings for CSV data.
        // include_once dirname( dirname( __FILE__ ) ) . '/admin/importers/mappings/mappings.php';

        $this->read_file();
    }

    protected function read_file()
    {
        if (!wc_is_file_valid_csv($this->file)) {
            wp_die(esc_html__('Invalid file type. The importer supports CSV and TXT file formats.', 'parcelpanel'));
        }

        $handle = fopen($this->file, 'r');  // @codingStandardsIgnoreLine.

        if (false !== $handle) {

            // 表头 清除空格 转小写
            $this->raw_keys = array_map(function ($v) {
                return trim($v);
            }, fgetcsv($handle, 0, $this->params['delimiter'], $this->params['enclosure'], $this->params['escape']));  // @codingStandardsIgnoreLine

            // Remove BOM signature from the first item.
            if (isset($this->raw_keys[0])) {
                $this->raw_keys[0] = $this->remove_utf8_bom($this->raw_keys[0]);
            }

            while ($row = fgetcsv($handle, 0, $this->params['delimiter'], $this->params['enclosure'], $this->params['escape'])) {

                // 计算总行数
                ++$this->lines;

                // Skip empty rows.
                if (empty(array_filter($row))) {
                    ++$this->spaces;
                    continue;
                }

                // 边界判断，忽略数据
                if ($this->lines <= $this->params['skip'] || $this->params['lines'] <= 0) {
                    unset($row);
                    continue;
                }

                // 计算剩余读取行数
                --$this->params['lines'];

                $this->raw_data[] = $row;
                $this->file_positions[] = $this->lines;
            }

            if (!empty($this->file_positions)) {
                $this->file_position = end($this->file_positions);
            } else {
                $this->file_position = $this->lines;
            }
        }

        if (!empty($this->params['mapping'])) {
            $this->set_mapped_keys();
        }

        if ($this->params['parse']) {
            $this->set_parsed_data();
        }
    }

    /**
     * 移除 UTF-8 BOM 签名
     *
     * @param string $string String to handle.
     *
     * @return string
     */
    protected function remove_utf8_bom(string $string): string
    {
        if ('efbbbf' === substr(bin2hex($string), 0, 6)) {
            $string = substr($string, 3);
        }

        return $string;
    }

    /**
     * Set file mapped keys.
     */
    protected function set_mapped_keys()
    {
        $mapping = $this->params['mapping'];

        foreach ($this->raw_keys as $key) {
            $this->mapped_keys[] = $mapping[$key] ?? $key;
        }
    }

    /**
     * 获取数据总行数
     *
     * @return int
     */
    function get_lines(): int
    {
        return $this->lines;
    }

    /**
     * 获取数据空行行数
     *
     * @return int
     */
    public function get_spaces(): int
    {
        return $this->spaces;
    }


    function parse_order_number_field($value): int
    {
        $order_id = preg_replace('/\A#/', '', $value);
        return absint((new ParcelPanelFunction)->parcelpanel_get_formatted_order_id($order_id));
    }

    /**
     * Parse relative field and return product ID.
     *
     * Handles `id:xx` and SKUs.
     *
     * If mapping to an id: and the product ID does not exist, this link is not
     * valid.
     *
     * If mapping to a SKU and the product ID does not exist, a temporary object
     * will be created so it can be updated later.
     *
     * @param string $value Field value.
     *
     * @return int|string
     */
    public function parse_relative_field($value)
    {
        global $wpdb;

        if (empty($value)) {
            return '';
        }

        // IDs are prefixed with id:.
        if (preg_match('/^id:(\d+)$/', $value, $matches)) {
            $id = intval($matches[1]);

            // If original_id is found, use that instead of the given ID since a new placeholder must have been created already.
            // WPCS: db call ok, cache ok.
            $original_id = $wpdb->get_var($wpdb->prepare("SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = '_original_id' AND meta_value = %s;", $id)); // phpcs:ignore

            if ($original_id) {
                return absint($original_id);
            }

            // See if the given ID maps to a valid product allready.
            // WPCS: db call ok, cache ok.
            $existing_id = $wpdb->get_var($wpdb->prepare("SELECT ID FROM {$wpdb->posts} WHERE post_type IN ( 'product', 'product_variation' ) AND ID = %d;", $id)); // phpcs:ignore

            if ($existing_id) {
                return absint($existing_id);
            }

            // If we're not updating existing posts, we may need a placeholder product to map to.
            if (!$this->params['update_existing']) {
                $product = wc_get_product_object('simple');
                $product->set_name('Import placeholder for ' . $id);
                $product->set_status('importing');
                $product->add_meta_data('_original_id', $id, true);
                $id = $product->save();
            }

            return $id;
        }

        $id = wc_get_product_id_by_sku($value);

        if ($id) {
            return $id;
        }

        try {
            $product = wc_get_product_object('simple');
            $product->set_name('Import placeholder for ' . $value);
            $product->set_status('importing');
            $product->set_sku($value);
            $id = $product->save();

            if ($id && !is_wp_error($id)) {
                return $id;
            }
        } catch (\Exception $e) {
            return '';
        }

        return '';
    }

    /**
     * Parse the ID field.
     *
     * If we're not doing an update, create a placeholder product so mapping works
     * for rows following this one.
     *
     * @param string $value Field value.
     *
     * @return int
     */
    public function parse_id_field($value)
    {
        global $wpdb;

        $id = absint($value);

        if (!$id) {
            return 0;
        }

        // See if this maps to an ID placeholder already.
        // WPCS: db call ok, cache ok.
        $original_id = $wpdb->get_var($wpdb->prepare("SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = '_original_id' AND meta_value = %s;", $id)); // phpcs:ignore

        if ($original_id) {
            return absint($original_id);
        }

        // Not updating? Make sure we have a new placeholder for this ID.
        if (!$this->params['update_existing']) {
            $mapped_keys = $this->get_mapped_keys();
            $sku_column_index = absint(array_search('sku', $mapped_keys, true));
            $row_sku = isset($this->raw_data[$this->parsing_raw_data_index][$sku_column_index]) ? $this->raw_data[$this->parsing_raw_data_index][$sku_column_index] : '';
            $id_from_sku = $row_sku ? wc_get_product_id_by_sku($row_sku) : '';

            // If row has a SKU, make sure placeholder was not made already.
            if ($id_from_sku) {
                return $id_from_sku;
            }

            $product = wc_get_product_object('simple');
            $product->set_name('Import placeholder for ' . $id);
            $product->set_status('importing');
            $product->add_meta_data('_original_id', $id, true);

            // If row has a SKU, make sure placeholder has it too.
            if ($row_sku) {
                $product->set_sku($row_sku);
            }
            $id = $product->save();
        }

        return $id && !is_wp_error($id) ? $id : 0;
    }

    /**
     * Parse relative comma-delineated field and return product ID.
     *
     * @param string $value Field value.
     *
     * @return array
     */
    public function parse_relative_comma_field($value)
    {
        if (empty($value)) {
            return [];
        }

        return array_filter(array_map([$this, 'parse_relative_field'], $this->explode_values($value)));
    }

    /**
     * Parse a comma-delineated field from a CSV.
     *
     * @param string $value Field value.
     *
     * @return array
     */
    public function parse_comma_field($value)
    {
        if (empty($value) && '0' !== $value) {
            return [];
        }

        $value = $this->unescape_data($value);
        return array_map('wc_clean', $this->explode_values($value));
    }

    /**
     * Parse a field that is generally '1' or '0' but can be something else.
     *
     * @param string $value Field value.
     *
     * @return bool|string
     */
    public function parse_bool_field($value)
    {
        if ('0' === $value) {
            return false;
        }

        if ('1' === $value) {
            return true;
        }

        // Don't return explicit true or false for empty fields or values like 'notify'.
        return wc_clean($value);
    }

    /**
     * 除了 0 都是 true
     */
    public function parse_mark_order_as_completed_field($value)
    {
        return $value;

        // if ('0' === $value) {
        //     return false;
        // }
        // return true;
    }

    /**
     * Parse a float value field.
     *
     * @param string $value Field value.
     *
     * @return float|string
     */
    public function parse_float_field($value)
    {
        if ('' === $value) {
            return $value;
        }

        // Remove the ' prepended to fields that start with - if needed.
        $value = $this->unescape_data($value);

        return floatval($value);
    }

    /**
     * Parse the stock qty field.
     *
     * @param string $value Field value.
     *
     * @return float|string
     */
    public function parse_stock_quantity_field($value)
    {
        if ('' === $value) {
            return $value;
        }

        // Remove the ' prepended to fields that start with - if needed.
        $value = $this->unescape_data($value);

        return wc_stock_amount($value);
    }

    /**
     * Parse the tax status field.
     *
     * @param string $value Field value.
     *
     * @return string
     */
    public function parse_tax_status_field($value)
    {
        if ('' === $value) {
            return $value;
        }

        // Remove the ' prepended to fields that start with - if needed.
        $value = $this->unescape_data($value);

        if ('true' === strtolower($value) || 'false' === strtolower($value)) {
            $value = wc_string_to_bool($value) ? 'taxable' : 'none';
        }

        return wc_clean($value);
    }

    /**
     * Parse a category field from a CSV.
     * Categories are separated by commas and subcategories are "parent > subcategory".
     *
     * @param string $value Field value.
     *
     * @return array of arrays with "parent" and "name" keys.
     */
    public function parse_categories_field($value)
    {
        if (empty($value)) {
            return [];
        }

        $row_terms = $this->explode_values($value);
        $categories = [];

        foreach ($row_terms as $row_term) {
            $parent = null;
            $_terms = array_map('trim', explode('>', $row_term));
            $total = count($_terms);

            foreach ($_terms as $index => $_term) {
                // Don't allow users without capabilities to create new categories.
                if (!current_user_can('manage_product_terms')) {
                    break;
                }

                $term = wp_insert_term($_term, 'product_cat', ['parent' => intval($parent)]);

                if (is_wp_error($term)) {
                    if ($term->get_error_code() === 'term_exists') {
                        // When term exists, error data should contain existing term id.
                        $term_id = $term->get_error_data();
                    } else {
                        break; // We cannot continue on any other error.
                    }
                } else {
                    // New term.
                    $term_id = $term['term_id'];
                }

                // Only requires assign the last category.
                if ((1 + $index) === $total) {
                    $categories[] = $term_id;
                } else {
                    // Store parent to be able to insert or query categories based in parent ID.
                    $parent = $term_id;
                }
            }
        }

        return $categories;
    }

    /**
     * Parse a tag field from a CSV.
     *
     * @param string $value Field value.
     *
     * @return array
     */
    public function parse_tags_field($value)
    {
        if (empty($value)) {
            return [];
        }

        $value = $this->unescape_data($value);
        $names = $this->explode_values($value);
        $tags = [];

        foreach ($names as $name) {
            $term = get_term_by('name', $name, 'product_tag');

            if (!$term || is_wp_error($term)) {
                $term = (object)wp_insert_term($name, 'product_tag');
            }

            if (!is_wp_error($term)) {
                $tags[] = $term->term_id;
            }
        }

        return $tags;
    }

    /**
     * Parse a tag field from a CSV with space separators.
     *
     * @param string $value Field value.
     *
     * @return array
     */
    public function parse_tags_spaces_field($value)
    {
        if (empty($value)) {
            return [];
        }

        $value = $this->unescape_data($value);
        $names = $this->explode_values($value, ' ');
        $tags = [];

        foreach ($names as $name) {
            $term = get_term_by('name', $name, 'product_tag');

            if (!$term || is_wp_error($term)) {
                $term = (object)wp_insert_term($name, 'product_tag');
            }

            if (!is_wp_error($term)) {
                $tags[] = $term->term_id;
            }
        }

        return $tags;
    }

    /**
     * Parse a shipping class field from a CSV.
     *
     * @param string $value Field value.
     *
     * @return int
     */
    public function parse_shipping_class_field($value)
    {
        if (empty($value)) {
            return 0;
        }

        $term = get_term_by('name', $value, 'product_shipping_class');

        if (!$term || is_wp_error($term)) {
            $term = (object)wp_insert_term($value, 'product_shipping_class');
        }

        if (is_wp_error($term)) {
            return 0;
        }

        return $term->term_id;
    }

    /**
     * Parse images list from a CSV. Images can be filenames or URLs.
     *
     * @param string $value Field value.
     *
     * @return array
     */
    public function parse_images_field($value)
    {
        if (empty($value)) {
            return [];
        }

        $images = [];
        $separator = apply_filters('woocommerce_product_import_image_separator', ',');

        foreach ($this->explode_values($value, $separator) as $image) {
            if (stristr($image, '://')) {
                $images[] = esc_url_raw($image);
            } else {
                $images[] = sanitize_file_name($image);
            }
        }

        return $images;
    }

    /**
     * Parse dates from a CSV.
     * Dates requires the format YYYY-MM-DD and time is optional.
     *
     * @param string $value Field value.
     *
     * @return string|null
     */
    public function parse_date_field(string $value)
    {
        if (empty($value)) {
            return null;
        }

        if (preg_match('/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])([ 01-9:]*)$/', $value)) {
            // Don't include the time if the field had time in it.
            return current(explode(' ', $value));
        }

        return null;
    }

    public function parse_fulfilled_date_field(string $value): int
    {
        if ($value) {
            $checkTime = explode(' ', $value);
            $get_time = strtotime($value);
            if (empty($checkTime[1])) {
                $check = strtotime(gmdate('Y-m-d'));
                $valueD = gmdate('Y-m-d', $get_time);
                if ($get_time < $check) {
                    $value = $valueD . ' 23:59:59';
                } else {
                    $value = $valueD . ' ' . gmdate('h:i:s');
                }
            }
        }
        $timeRes = !empty($value) ? strtotime($value) : time();
        return !empty($timeRes) ? $timeRes : time();
    }

    /**
     * Parse backorders from a CSV.
     *
     * @param string $value Field value.
     *
     * @return string
     */
    public function parse_backorders_field($value)
    {
        if (empty($value)) {
            return 'no';
        }

        $value = $this->parse_bool_field($value);

        if ('notify' === $value) {
            return 'notify';
        } elseif (is_bool($value)) {
            return $value ? 'yes' : 'no';
        }

        return 'no';
    }

    /**
     * Just skip current field.
     *
     * By default is applied wc_clean() to all not listed fields
     * in self::get_formatting_callback(), use this method to skip any formatting.
     *
     * @param string $value Field value.
     *
     * @return string
     */
    public function parse_skip_field($value)
    {
        return $value;
    }

    /**
     * Parse download file urls, we should allow shortcodes here.
     *
     * Allow shortcodes if present, othersiwe esc_url the value.
     *
     * @param string $value Field value.
     *
     * @return string
     */
    public function parse_download_file_field($value)
    {
        // Absolute file paths.
        if (0 === strpos($value, 'http')) {
            return esc_url_raw($value);
        }
        // Relative and shortcode paths.
        return wc_clean($value);
    }

    /**
     * Parse an int value field
     *
     * @param int $value field value.
     *
     * @return int
     */
    public function parse_int_field($value)
    {
        // Remove the ' prepended to fields that start with - if needed.
        $value = $this->unescape_data($value);

        return intval($value);
    }

    /**
     * Parse a description value field
     *
     * @param string $description field value.
     *
     * @return string
     */
    public function parse_description_field($description)
    {
        $parts = explode("\\\\n", $description);
        foreach ($parts as $key => $part) {
            $parts[$key] = str_replace('\n', "\n", $part);
        }

        return implode('\\\n', $parts);
    }

    /**
     * Parse the published field. 1 is published, 0 is private, -1 is draft.
     * Alternatively, 'true' can be used for published and 'false' for draft.
     *
     * @param string $value Field value.
     *
     * @return float|string
     */
    public function parse_published_field($value)
    {
        if ('' === $value) {
            return $value;
        }

        // Remove the ' prepended to fields that start with - if needed.
        $value = $this->unescape_data($value);

        if ('true' === strtolower($value) || 'false' === strtolower($value)) {
            return wc_string_to_bool($value) ? 1 : -1;
        }

        return floatval($value);
    }

    /**
     * Get formatting callback.
     *
     * @return array
     */
    protected function get_formatting_callback(): array
    {
        /**
         * 此处未提及的列将使用 wc_clean 进行解析
         * column_name => callback.
         */
        $data_formatting = [
            'order_number' => [$this, 'parse_order_number_field'],
            'fulfilled_date' => [$this, 'parse_fulfilled_date_field'],
            'mark_order_as_completed' => [$this, 'parse_mark_order_as_completed_field'],
            'qty' => 'intval',
        ];

        $callbacks = [];

        // 找出每一列的解析函数
        foreach ($this->get_mapped_keys() as $heading) {
            $callback = 'wc_clean';

            if (isset($data_formatting[$heading])) {
                $callback = $data_formatting[$heading];
            }

            $callbacks[] = $callback;
        }

        return $callbacks;
    }

    /**
     * Check if strings starts with determined word.
     *
     * @param string $haystack Complete sentence.
     * @param string $needle Excerpt.
     *
     * @return bool
     */
    protected function starts_with(string $haystack, string $needle): bool
    {
        return substr($haystack, 0, strlen($needle)) === $needle;
    }

    /**
     * Expand special and internal data into the correct formats for the product CRUD.
     *
     * @param array $data Data to import.
     *
     * @return array
     */
    protected function expand_data($data)
    {
        // $data = apply_filters( 'woocommerce_product_importer_pre_expand_data', $data );

        // Images field maps to image and gallery id fields.
        if (isset($data['images'])) {
            $images = $data['images'];
            $data['raw_image_id'] = array_shift($images);

            if (!empty($images)) {
                $data['raw_gallery_image_ids'] = $images;
            }
            unset($data['images']);
        }

        // Type, virtual and downloadable are all stored in the same column.
        if (isset($data['type'])) {
            $data['type'] = array_map('strtolower', $data['type']);
            $data['virtual'] = in_array('virtual', $data['type'], true);
            $data['downloadable'] = in_array('downloadable', $data['type'], true);

            // Convert type to string.
            $data['type'] = current(array_diff($data['type'], ['virtual', 'downloadable']));

            if (!$data['type']) {
                $data['type'] = 'simple';
            }
        }

        // Status is mapped from a special published field.
        if (isset($data['published'])) {
            $statuses = [
                -1 => 'draft',
                0 => 'private',
                1 => 'publish',
            ];
            $data['status'] = isset($statuses[$data['published']]) ? $statuses[$data['published']] : 'draft';

            // Fix draft status of variations.
            if (isset($data['type']) && 'variation' === $data['type'] && -1 === $data['published']) {
                $data['status'] = 'publish';
            }

            unset($data['published']);
        }

        if (isset($data['stock_quantity'])) {
            if ('' === $data['stock_quantity']) {
                $data['manage_stock'] = false;
                $data['stock_status'] = isset($data['stock_status']) ? $data['stock_status'] : true;
            } else {
                $data['manage_stock'] = true;
            }
        }

        // Stock is bool or 'backorder'.
        if (isset($data['stock_status'])) {
            if ('backorder' === $data['stock_status']) {
                $data['stock_status'] = 'onbackorder';
            } else {
                $data['stock_status'] = $data['stock_status'] ? 'instock' : 'outofstock';
            }
        }

        // Prepare grouped products.
        if (isset($data['grouped_products'])) {
            $data['children'] = $data['grouped_products'];
            unset($data['grouped_products']);
        }

        // Tag ids.
        if (isset($data['tag_ids_spaces'])) {
            $data['tag_ids'] = $data['tag_ids_spaces'];
            unset($data['tag_ids_spaces']);
        }

        // Handle special column names which span multiple columns.
        $attributes = [];
        $downloads = [];
        $meta_data = [];

        foreach ($data as $key => $value) {
            if ($this->starts_with($key, 'attributes:name')) {
                if (!empty($value)) {
                    $attributes[str_replace('attributes:name', '', $key)]['name'] = $value;
                }
                unset($data[$key]);
            } elseif ($this->starts_with($key, 'attributes:value')) {
                $attributes[str_replace('attributes:value', '', $key)]['value'] = $value;
                unset($data[$key]);
            } elseif ($this->starts_with($key, 'attributes:taxonomy')) {
                $attributes[str_replace('attributes:taxonomy', '', $key)]['taxonomy'] = wc_string_to_bool($value);
                unset($data[$key]);
            } elseif ($this->starts_with($key, 'attributes:visible')) {
                $attributes[str_replace('attributes:visible', '', $key)]['visible'] = wc_string_to_bool($value);
                unset($data[$key]);
            } elseif ($this->starts_with($key, 'attributes:default')) {
                if (!empty($value)) {
                    $attributes[str_replace('attributes:default', '', $key)]['default'] = $value;
                }
                unset($data[$key]);
            } elseif ($this->starts_with($key, 'downloads:id')) {
                if (!empty($value)) {
                    $downloads[str_replace('downloads:id', '', $key)]['id'] = $value;
                }
                unset($data[$key]);
            } elseif ($this->starts_with($key, 'downloads:name')) {
                if (!empty($value)) {
                    $downloads[str_replace('downloads:name', '', $key)]['name'] = $value;
                }
                unset($data[$key]);
            } elseif ($this->starts_with($key, 'downloads:url')) {
                if (!empty($value)) {
                    $downloads[str_replace('downloads:url', '', $key)]['url'] = $value;
                }
                unset($data[$key]);
            } elseif ($this->starts_with($key, 'meta:')) {
                $meta_data[] = [
                    'key' => str_replace('meta:', '', $key),
                    'value' => $value,
                ];
                unset($data[$key]);
            }
        }

        if (!empty($attributes)) {
            // Remove empty attributes and clear indexes.
            foreach ($attributes as $attribute) {
                if (empty($attribute['name'])) {
                    continue;
                }

                $data['raw_attributes'][] = $attribute;
            }
        }

        if (!empty($downloads)) {
            $data['downloads'] = [];

            foreach ($downloads as $key => $file) {
                if (empty($file['url'])) {
                    continue;
                }

                $data['downloads'][] = [
                    'download_id' => isset($file['id']) ? $file['id'] : null,
                    'name' => $file['name'] ? $file['name'] : wc_get_filename_from_url($file['url']),
                    'file' => $file['url'],
                ];
            }
        }

        if (!empty($meta_data)) {
            $data['meta_data'] = $meta_data;
        }

        return $data;
    }

    /**
     * Map and format raw data to known fields.
     */
    protected function set_parsed_data()
    {
        $parse_functions = $this->get_formatting_callback();
        $mapped_keys = $this->get_mapped_keys();
        $use_mb = function_exists('mb_convert_encoding');

        // Parse the data.
        foreach ($this->raw_data as $row_index => $row) {

            $this->parsing_raw_data_index = $row_index;

            $data = [];
            foreach ($row as $id => $value) {
                // Skip ignored columns.
                if (empty($mapped_keys[$id])) {
                    continue;
                }

                // Convert UTF8.
                if ($use_mb) {
                    $encoding = mb_detect_encoding($value, mb_detect_order(), true);
                    if ($encoding) {
                        $value = mb_convert_encoding($value, 'UTF-8', $encoding);
                    } else {
                        $value = mb_convert_encoding($value, 'UTF-8', 'UTF-8');
                    }
                } else {
                    $value = wp_check_invalid_utf8($value, true);
                }

                $value = ltrim($value, "'");

                $data[$mapped_keys[$id]] = call_user_func($parse_functions[$id], $value);
            }

            // $this->parsed_data[] = $this->expand_data( $data );
            $this->parsed_data[] = $data;
        }
    }


    /**
     * Process importer.
     * @return array
     */
    public function import(): array
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TACKING_ITEMS = Table::$tracking_items;

        $this->start_time = time();
        $index = 0;
        $rtn_data = [
            'succeeded_count' => 0,
            'failed_count' => 0,
            'failed_msg' => [],
        ];

        $TRACKING_NUMBER_MIN_LEN = 4;

        wc_transaction_query();

        $success_order_ids = [];


        $wpdb->show_errors = false;
        foreach ($this->parsed_data as $parsed_data) {

            $this->order_id = 0;
            $this->tracking_items = [];

            $now_line = $this->file_positions[$index++];
            $file_line = $now_line + 1;  // 文件行数；表头占一行

            try {

                $order_id = $parsed_data['order_number'] ?? 0;
                $sku = $parsed_data['sku'] ?? '';
                $quantity = $parsed_data['qty'] ?? 0;

                if (!empty($order_id)) {
                    $order = wc_get_order($order_id);
                }

                if (empty($order)) {
                    // 订单不存在
                    throw new \Exception('Invalid order number');
                }

                $this->order_id = $order_id;

                $courier_code = (new ParcelPanelFunction)->parcelpanel_get_courier_code_from_name($parsed_data['courier'] ?? '');
                $tracking_number = $parsed_data['tracking_number'] ?? '';
                $fulfilled_at = $parsed_data['fulfilled_date'] ?? time();
                $shipment_status = 1;

                // number identify
                if (empty($courier_code) && !empty($tracking_number)) {
                    $res_data = API::number_identify($tracking_number);
                    $courier_code = ArrUtils::get($res_data, 'courier_code', '');
                }

                if (empty($tracking_number) || strlen($tracking_number) < $TRACKING_NUMBER_MIN_LEN) {
                    // 单号为空 或 太短
                    throw new \Exception('Invalid tracking number');
                }

                $is_editable_tracking = self::is_editable_tracking($order_id, $tracking_number);
                if (!$is_editable_tracking) {
                    throw new \Exception('Tracking number already exists');
                }

                $this->retrieve_tracking_items();
                // 如果有订单全发货就报错
                if ($this->is_shipped_all()) {
                    throw new \Exception('All items of this type of product are shipped.');
                }

                $order_line_items_quantity_by_id = [];
                /** @var \WC_Order_Item_Product[] $items */
                $items = $order->get_items('line_item');
                foreach ($items as $item) {
                    $order_line_items_quantity_by_id[$item->get_id()] = $item->get_quantity('edit');
                }

                $shipment_line_items = [];
                if ($sku) {
                    foreach ($items as $item) {
                        $_sku = $item->get_product()->get_sku('edit');
                        $_quantity = $item->get_quantity('edit');
                        if ($_sku === $sku) {
                            $shipment_line_items[] = [
                                'id' => $item->get_id(),
                                'name' => $item->get_name(),
                                'quantity' => 0 < $quantity ? $quantity : $_quantity,
                            ];
                            break;
                        }
                    }
                    if (empty($shipment_line_items)) {
                        throw new \Exception('The SKU of this item doesn\'t exist');
                    }
                }
                if (empty($shipment_line_items)) {
                    // Populate all order items and let subsequent steps adapt to the quantity of items
                    foreach ($items as $item) {
                        $shipment_line_items[] = [
                            'id' => $item->get_id(),
                            'name' => $item->get_name(),
                            'quantity' => $item->get_quantity('edit'),
                        ];
                    }
                }

                // Adjust to shippable quantity
                $shipment_line_items_quantity_by_id = ShopOrder::get_items_quantity(null, $order_line_items_quantity_by_id, $shipment_line_items, $this->tracking_items);
                if (empty($shipment_line_items_quantity_by_id)) {
                    throw new \Exception('All items of this type of product are shipped.');
                }

                $tracking_data = self::init_tracking_data($tracking_number, $courier_code, $fulfilled_at, $order_id, $shipment_line_items);
                if (is_wp_error($tracking_data)) {
                    throw new \Exception('Tracking number already exists');
                }

                $current_tracking_items = [];
                foreach ($this->tracking_items as $shipment) {
                    if ($tracking_data->id == $shipment->tracking_id) {
                        $current_tracking_items[] = $shipment;
                    }
                }
                $_original_shipment = $current_tracking_items[0] ?? null;

                $k1 = [];
                foreach ($current_tracking_items as $shipment) {
                    if (!$shipment->quantity) {
                        $k1[$shipment->order_item_id] = 0;
                        continue;
                    }
                    if (!array_key_exists($shipment->order_item_id, $k1)) {
                        $k1[$shipment->order_item_id] = 0;
                    } elseif (!$k1[$shipment->order_item_id]) {
                        // If the current product quantity has been set to 0, it will no longer be counted.
                        continue;
                    }
                    $k1[$shipment->order_item_id] += $shipment->quantity;
                }

                foreach ($shipment_line_items_quantity_by_id as $_order_item_id => $_quantity) {
                    if (!array_key_exists($_order_item_id, $k1)) {
                        $k1[$_order_item_id] = 0;
                    }
                    $k1[$_order_item_id] += $_quantity;
                }

                $insert_data = [];
                $delete_data = [];
                foreach ($k1 as $_order_item_id => $_quantity) {
                    $is_ok = false;
                    foreach ($current_tracking_items as $k => $_shipment) {
                        if ($_shipment->order_item_id == $_order_item_id) {
                            // $has_data = true;
                            if ($_shipment->quantity != $_quantity) {
                                $delete_data[] = $_shipment->tracking_item_id;
                            } else {
                                if ($is_ok) {
                                    $delete_data[] = $_shipment->tracking_item_id;
                                } else {
                                    $is_ok = true;
                                }
                            }
                            unset($current_tracking_items[$k]);
                        }
                    }

                    if (!$is_ok) {
                        $item_insert_data = [
                            'order_id' => $order_id,
                            'order_item_id' => $_order_item_id,
                            'quantity' => $_quantity,
                            'tracking_id' => $tracking_data->id,
                            'shipment_status' => $tracking_data->shipment_status,
                        ];
                        $tracking_ids[] = $tracking_data->id;
                        if ($_original_shipment) {
                            $item_insert_data['shipment_status'] = $_original_shipment->shipment_status;
                            $item_insert_data['custom_status_time'] = $_original_shipment->custom_status_time;
                            $item_insert_data['custom_shipment_status'] = $_original_shipment->custom_shipment_status;
                        }
                        $insert_data[] = $item_insert_data;
                    }
                }

                if (!empty($insert_data)) {
                    foreach ($insert_data as $datum) {
                        // add shipment data
                        $wpdb->insert($TABLE_TACKING_ITEMS, $datum); // phpcs:ignore
                    }
                }
                if (!empty($delete_data)) {
                    // del fail log
                    $placeholder_str = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($delete_data, '%d');
                    $table_tracking_items = $wpdb->prefix . 'parcelpanel_tracking_items';
                    $wpdb->query($wpdb->prepare("DELETE FROM $wpdb->prefix'parcelpanel_tracking_items' WHERE id IN ({$placeholder_str})", $delete_data)); // phpcs:ignore
                }

                $success_order_ids[] = $order_id;

                if (!empty($success_order_ids)) {

                    $success_order_ids = array_unique($success_order_ids);

                    // update shipments
                    foreach ($success_order_ids as $order_id) {
                        ShopOrder::adjust_unfulfilled_shipment_items($order_id);
                    }
                }

                // 0:  no change status  other: completed  2: partial_shipped 3 shipped
                $mark_order_as_completed = $parsed_data['mark_order_as_completed'] ?? true;
                if ('0' !== $mark_order_as_completed) {
                    if ($mark_order_as_completed === '2') {
                        if (!empty($tracking_ids)) {
                            update_option(sprintf(\ParcelPanel\OptionName\NO_EMAIL_TRACKING, $order_id), array_values($tracking_ids));
                        } else {
                            update_option(sprintf(\ParcelPanel\OptionName\NO_EMAIL_TRACKING, $order_id), []);
                        }
                        // order to partial_shipped
                        ShopOrder::update_order_status_to_partial_shipped($order_id);
                    } else if ($mark_order_as_completed === '3') {
                        // order to shipped
                        ShopOrder::update_order_status_to_shipped($order_id);
                        // } else if ($mark_order_as_completed === '4') {
                        // order to delivered
                        // ShopOrder::update_order_status_to_delivered($order_id);
                    } else {
                        // order to completed
                        ShopOrder::update_order_status_to_completed($order_id);
                    }
                }

                $rtn_data['succeeded_count'] += 1;
            } catch (\Exception $e) {

                $message = $e->getMessage();

                $rtn_data['failed_msg'][] = "line {$file_line} : {$message}";

                $rtn_data['failed_count'] += 1;
            } finally {
                unset($order);
            }

            if ($this->params['prevent_timeouts'] && ($this->time_exceeded() || $this->memory_exceeded())) {
                $this->file_position = $now_line;
                break;
            }
        }

        // commit
        wc_transaction_query('commit');

        return $rtn_data;
    }

    private function retrieve_tracking_items()
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;
        // @codingStandardsIgnoreStart
        $this->tracking_items = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT
                ppt.id,
                ppti.id AS tracking_item_id,
                ppti.tracking_id,
                ppti.order_id,
                ppti.order_item_id,
                ppti.quantity,
                ppti.custom_shipment_status,
                ppti.custom_status_time,
                ppt.tracking_number,
                ppt.courier_code,
                ppti.shipment_status,
                ppt.last_event,
                ppt.original_country,
                ppt.destination_country,
                ppt.origin_info,
                ppt.destination_info,
                ppt.transit_time,
                ppt.stay_time,
                ppt.fulfilled_at,
                ppt.updated_at
                FROM {$TABLE_TRACKING_ITEMS} AS ppti
                LEFT JOIN {$TABLE_TRACKING} AS ppt ON ppt.id = ppti.tracking_id
                WHERE ppti.order_id=%d",
                $this->order_id
            )
        );
        // @codingStandardsIgnoreEnd
    }

    private function is_shipped_all(): bool
    {
        foreach ($this->tracking_items as $item) {
            if ($item->tracking_id && empty($item->order_item_id)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 单号入库
     *
     * @param string $tracking_number 运单号码
     * @param string $courier_code 运输商简码
     * @param int $fulfilled_at 时间戳
     *
     * @return \stdClass|\WP_Error
     */
    public static function init_tracking_data(string $tracking_number, string $courier_code = '', int $fulfilled_at = 0, $order_id = 0, $shipment_line_items = [])
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;

        // @codingStandardsIgnoreStart
        $tracking_data = $wpdb->get_row($wpdb->prepare(
            "SELECT id,tracking_number,courier_code,shipment_status,sync_times,fulfilled_at,updated_at FROM {$TABLE_TRACKING} WHERE tracking_number=%s",
            $tracking_number
        ));
        // @codingStandardsIgnoreEnd

        if (empty($tracking_data)) {
            $tracking_item_data = ShopOrder::get_tracking_item_data($tracking_number, $courier_code, $fulfilled_at);
            $res = $wpdb->insert($TABLE_TRACKING, $tracking_item_data); // phpcs:ignore
            if (false === $res) {
                // 数据库问题，可能是单号重复
                $error = $wpdb->last_error;
                return new \WP_Error('db_error', '', $error);
            }

            $tracking_data = new \stdClass();
            $tracking_data->id = $wpdb->insert_id;
            $tracking_data->tracking_number = $tracking_number;
            $tracking_data->courier_code = $courier_code;
            $tracking_data->shipment_status = 1;
            $tracking_data->sync_times = 0;
            $tracking_data->fulfilled_at = $tracking_item_data['fulfilled_at'];
            $tracking_data->updated_at = $tracking_item_data['updated_at'];

            // add shipment data message
            $order_message = [
                'order_id' => $order_id,
                'tracking_number' => $tracking_number,
                'shipment_line_items' => $shipment_line_items,
                'courier_code' => $courier_code,
                'fulfilled_at' => $fulfilled_at,
            ];
            Common::instance()->shipmentChange($order_message, 1);

            return $tracking_data;
        }

        $tracking_data->id = (int)$tracking_data->id;
        $tracking_data->shipment_status = (int)$tracking_data->shipment_status;
        $tracking_data->sync_times = (int)$tracking_data->sync_times;
        $tracking_data->fulfilled_at = (int)$tracking_data->fulfilled_at;
        $tracking_data->updated_at = (int)$tracking_data->updated_at;

        $_update_tracking_data = [];
        if ($tracking_data->courier_code != $courier_code) {
            // 修改了运输商需要重新同步单号
            $_update_tracking_data['courier_code'] = $courier_code;
            $_update_tracking_data['shipment_status'] = 1;
            $_update_tracking_data['last_event'] = null;
            $_update_tracking_data['original_country'] = '';
            $_update_tracking_data['destination_country'] = '';
            $_update_tracking_data['origin_info'] = null;
            $_update_tracking_data['destination_info'] = null;
            $_update_tracking_data['transit_time'] = 0;
            $_update_tracking_data['stay_time'] = 0;
            $_update_tracking_data['sync_times'] = 0;
            $_update_tracking_data['received_times'] = 0;
        }
        if ($tracking_data->fulfilled_at != $fulfilled_at) {
            $_update_tracking_data['fulfilled_at'] = $fulfilled_at;
        }
        if (0 < $tracking_data->sync_times) {
            // 重置同步次数
            $_update_tracking_data['sync_times'] = 0;
        }
        if (!empty($_update_tracking_data)) {
            $_update_tracking_data['updated_at'] = time();

            $res = $wpdb->update($TABLE_TRACKING, $_update_tracking_data, ['id' => $tracking_data->id]); // phpcs:ignore

            if (false === $res) {
                $error = $wpdb->last_error;
                return new \WP_Error('db_error', '', $error);
            }

            // update shipment data message
            $order_message = [
                'order_id' => $order_id,
                'tracking_number' => $tracking_number,
                'shipment_line_items' => $shipment_line_items,
                'courier_code' => $courier_code,
                'fulfilled_at' => $fulfilled_at,
            ];
            Common::instance()->shipmentChange($order_message, 2);
        }

        return $tracking_data;
    }

    /**
     * 判断单号是否关联了指定订单，或者未关联任何订单
     *
     * @param $order_id
     * @param $tracking_number
     *
     * @return bool
     */
    private static function is_editable_tracking($order_id, $tracking_number): bool
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        // @codingStandardsIgnoreStart
        $_order_id = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT ppti.order_id FROM
                (SELECT id FROM {$TABLE_TRACKING} WHERE tracking_number=%s) AS ppt
                JOIN {$TABLE_TRACKING_ITEMS} AS ppti ON ppt.id=ppti.tracking_id LIMIT 1",
                $tracking_number
            )
        );
        // @codingStandardsIgnoreEnd
        if (!empty($_order_id) && $_order_id != $order_id) {
            return false;
        }

        return true;
    }


    /**
     * Get file raw headers.
     *
     * @return array
     */
    public function get_raw_keys()
    {
        return $this->raw_keys;
    }

    /**
     * Get file mapped headers.
     *
     * @return array
     */
    function get_mapped_keys(): array
    {
        return $this->mapped_keys ?: $this->raw_keys;
    }

    /**
     * Get raw data.
     *
     * @return array
     */
    public function get_raw_data()
    {
        return $this->raw_data;
    }

    /**
     * Get parsed data.
     *
     * @return array
     */
    public function get_parsed_data()
    {
        /**
         * Filter product importer parsed data.
         *
         * @param array $parsed_data Parsed data.
         * @param WC_Product_Importer $importer Importer instance.
         */
        return apply_filters('woocommerce_product_importer_parsed_data', $this->parsed_data, $this);
    }

    /**
     * Get importer parameters.
     *
     * @return array
     */
    function get_params(): array
    {
        return $this->params;
    }

    /**
     * Get file pointer position from the last read.
     *
     * @return int
     */
    function get_file_position(): int
    {
        return $this->file_position;
    }


    /**
     * Get file pointer position as a percentage of file size.
     *
     * @return int
     */
    function get_percent_complete(): int
    {
        if (!$this->lines) {
            return 0;
        }

        return absint(min(NumberUtil::round(($this->file_position / $this->lines) * 100), 100));
    }


    /**
     * Convert raw image URLs to IDs and set.
     *
     * @param WC_Product $product Product instance.
     * @param array $data Item data.
     */
    protected function set_image_data(&$product, $data)
    {
        // Image URLs need converting to IDs before inserting.
        if (isset($data['raw_image_id'])) {
            $product->set_image_id($this->get_attachment_id_from_url($data['raw_image_id'], $product->get_id()));
        }

        // Gallery image URLs need converting to IDs before inserting.
        if (isset($data['raw_gallery_image_ids'])) {
            $gallery_image_ids = [];

            foreach ($data['raw_gallery_image_ids'] as $image_id) {
                $gallery_image_ids[] = $this->get_attachment_id_from_url($image_id, $product->get_id());
            }
            $product->set_gallery_image_ids($gallery_image_ids);
        }
    }


    /**
     * Get variation parent attributes and set "is_variation".
     *
     * @param array $attributes Attributes list.
     * @param WC_Product $parent Parent product data.
     *
     * @return array
     */
    protected function get_variation_parent_attributes($attributes, $parent)
    {
        $parent_attributes = $parent->get_attributes();
        $require_save = false;

        foreach ($attributes as $attribute) {
            $attribute_id = 0;

            // Get ID if is a global attribute.
            if (!empty($attribute['taxonomy'])) {
                $attribute_id = $this->get_attribute_taxonomy_id($attribute['name']);
            }

            if ($attribute_id) {
                $attribute_name = wc_attribute_taxonomy_name_by_id($attribute_id);
            } else {
                $attribute_name = sanitize_title($attribute['name']);
            }

            // Check if attribute handle variations.
            if (isset($parent_attributes[$attribute_name]) && !$parent_attributes[$attribute_name]->get_variation()) {
                // Re-create the attribute to CRUD save and generate again.
                $parent_attributes[$attribute_name] = clone $parent_attributes[$attribute_name];
                $parent_attributes[$attribute_name]->set_variation(1);

                $require_save = true;
            }
        }

        // Save variation attributes.
        if ($require_save) {
            $parent->set_attributes(array_values($parent_attributes));
            $parent->save();
        }

        return $parent_attributes;
    }

    /**
     * Get attachment ID.
     *
     * @param string $url Attachment URL.
     * @param int $product_id Product ID.
     *
     * @return int
     * @throws Exception If attachment cannot be loaded.
     */
    public function get_attachment_id_from_url($url, $product_id)
    {
        if (empty($url)) {
            return 0;
        }

        $id = 0;
        $upload_dir = wp_upload_dir(null, false);
        $base_url = $upload_dir['baseurl'] . '/';

        // Check first if attachment is inside the WordPress uploads directory, or we're given a filename only.
        if (false !== strpos($url, $base_url) || false === strpos($url, '://')) {
            // Search for yyyy/mm/slug.extension or slug.extension - remove the base URL.
            $file = str_replace($base_url, '', $url);
            $args = [
                'post_type' => 'attachment',
                'post_status' => 'any',
                'fields' => 'ids',
                'meta_query' => [ // @codingStandardsIgnoreLine.
                    'relation' => 'OR',
                    [
                        'key' => '_wp_attached_file',
                        'value' => '^' . $file,
                        'compare' => 'REGEXP',
                    ],
                    [
                        'key' => '_wp_attached_file',
                        'value' => '/' . $file,
                        'compare' => 'LIKE',
                    ],
                    [
                        'key' => '_wc_attachment_source',
                        'value' => '/' . $file,
                        'compare' => 'LIKE',
                    ],
                ],
            ];
        } else {
            // This is an external URL, so compare to source.
            $args = [
                'post_type' => 'attachment',
                'post_status' => 'any',
                'fields' => 'ids',
                'meta_query' => [ // @codingStandardsIgnoreLine.
                    [
                        'value' => $url,
                        'key' => '_wc_attachment_source',
                    ],
                ],
            ];
        }

        $ids = get_posts($args); // @codingStandardsIgnoreLine.

        if ($ids) {
            $id = current($ids);
        }

        // Upload if attachment does not exists.
        if (!$id && stristr($url, '://')) {
            $upload = wc_rest_upload_image_from_url($url);

            if (is_wp_error($upload)) {
                throw new Exception(esc_html($upload->get_error_message()), 400);
            }

            $id = wc_rest_set_uploaded_image_as_attachment($upload, $product_id);

            if (!wp_attachment_is_image($id)) {
                /* translators: %s: image URL */
                throw new Exception(esc_url(sprintf(__('Not able to attach "%s".', 'woocommerce'), $url)), 400);
            }

            // Save attachment source for future reference.
            update_post_meta($id, '_wc_attachment_source', $url);
        }

        if (!$id) {
            /* translators: %s: image URL */
            throw new Exception(esc_url(sprintf(__('Unable to use image "%s".', 'woocommerce'), $url)), 400);
        }

        return $id;
    }

    /**
     * Get attribute taxonomy ID from the imported data.
     * If does not exists register a new attribute.
     *
     * @param string $raw_name Attribute name.
     *
     * @return int
     * @throws Exception If taxonomy cannot be loaded.
     */
    public function get_attribute_taxonomy_id($raw_name)
    {
        global $wpdb, $wc_product_attributes;

        // These are exported as labels, so convert the label to a name if possible first.
        $attribute_labels = wp_list_pluck(wc_get_attribute_taxonomies(), 'attribute_label', 'attribute_name');
        $attribute_name = array_search($raw_name, $attribute_labels, true);

        if (!$attribute_name) {
            $attribute_name = wc_sanitize_taxonomy_name($raw_name);
        }

        $attribute_id = wc_attribute_taxonomy_id_by_name($attribute_name);

        // Get the ID from the name.
        if ($attribute_id) {
            return $attribute_id;
        }

        // If the attribute does not exist, create it.
        $attribute_id = wc_create_attribute(
            [
                'name' => $raw_name,
                'slug' => $attribute_name,
                'type' => 'select',
                'order_by' => 'menu_order',
                'has_archives' => false,
            ]
        );

        if (is_wp_error($attribute_id)) {
            throw new Exception(esc_url($attribute_id->get_error_message()), 400);
        }

        // Register as taxonomy while importing.
        $taxonomy_name = wc_attribute_taxonomy_name($attribute_name);
        register_taxonomy(
            $taxonomy_name,
            apply_filters('woocommerce_taxonomy_objects_' . $taxonomy_name, ['product']),
            apply_filters(
                'woocommerce_taxonomy_args_' . $taxonomy_name,
                [
                    'labels' => [
                        'name' => $raw_name,
                    ],
                    'hierarchical' => true,
                    'show_ui' => false,
                    'query_var' => true,
                    'rewrite' => false,
                ]
            )
        );

        // Set product attributes global.
        $wc_product_attributes = [];

        foreach (wc_get_attribute_taxonomies() as $taxonomy) {
            $wc_product_attributes[wc_attribute_taxonomy_name($taxonomy->attribute_name)] = $taxonomy;
        }

        return $attribute_id;
    }

    /**
     * Memory exceeded
     *
     * Ensures the batch process never exceeds 90%
     * of the maximum WordPress memory.
     *
     * @return bool
     */
    protected function memory_exceeded(): bool
    {
        $memory_limit = $this->get_memory_limit() * 0.9;  // 90% of max memory
        $current_memory = memory_get_usage(true);
        $return = false;
        if ($memory_limit <= $current_memory) {
            $return = true;
        }
        return apply_filters('pp_tracking_number_importer_memory_exceeded', $return);
    }

    /**
     * Get memory limit
     *
     * @return int
     */
    protected function get_memory_limit()
    {
        if (function_exists('ini_get')) {
            $memory_limit = ini_get('memory_limit');
        } else {
            // Sensible default.
            $memory_limit = '128M';
        }

        if (!$memory_limit || -1 === intval($memory_limit)) {
            // Unlimited, set to 32GB.
            $memory_limit = '32000M';
        }
        return intval($memory_limit) * 1024 * 1024;
    }

    /**
     * Time exceeded.
     *
     * Ensures the batch never exceeds a sensible time limit.
     * A timeout limit of 30s is common on shared hosting.
     *
     * @return bool
     */
    protected function time_exceeded(): bool
    {
        $finish = $this->start_time + apply_filters('pp_tracking_number_importer_default_time_limit', 20);  // 20 seconds
        $return = false;
        if ($finish <= time()) {
            $return = true;
        }
        return apply_filters('pp_tracking_number_importer_time_exceeded', $return);
    }

    /**
     * Explode CSV cell values using commas by default, and handling escaped
     * separators.
     *
     * @param string $value Value to explode.
     * @param string $separator Separator separating each value. Defaults to comma.
     *
     * @return array
     * @since  3.2.0
     */
    protected function explode_values($value, $separator = ',')
    {
        $value = str_replace('\\,', '::separator::', $value);
        $values = explode($separator, $value);
        $values = array_map([$this, 'explode_values_formatter'], $values);

        return $values;
    }

    /**
     * Remove formatting and trim each value.
     *
     * @param string $value Value to format.
     *
     * @return string
     * @since  3.2.0
     */
    protected function explode_values_formatter($value)
    {
        return trim(str_replace('::separator::', ',', $value));
    }

    /**
     * The exporter prepends a ' to escape fields that start with =, +, - or @.
     * Remove the prepended ' character preceding those characters.
     *
     * @param string $value A string that may or may not have been escaped with '.
     *
     * @return string
     * @since 3.5.2
     */
    protected function unescape_data(string $value): string
    {
        $active_content_triggers = ["'=", "'+", "'-", "'@"];

        if (in_array(mb_substr($value, 0, 2), $active_content_triggers, true)) {
            $value = mb_substr($value, 1);
        }

        return $value;
    }
}
