<?php

namespace ParcelPanel\Libs;

/**
 * 此代码来自：https://github.com/TencentCloud/tencentcloud-sdk-php/blob/master/src/QcloudApi/Common/Sign.php
 */
class ApiSign
{
    /**
     * 执行签名
     */
    static function doSign(array $params, string $secretKey): string
    {
        return self::sign(self::_buildParamStr($params), $secretKey);
    }


    /**
     * sign
     * 生成签名
     *
     * @param string $srcStr    拼接签名源文字符串
     * @param string $secretKey secretKey
     * @param string $method    请求方法
     *
     * @return string
     * @throws \Exception
     */
    static function sign(string $srcStr, string $secretKey, string $method = 'HmacSHA1'): string
    {
        if ('HmacSHA1' == $method) {
            return base64_encode(hash_hmac('sha1', $srcStr, $secretKey, true));
        }

        if ('HmacSHA256' == $method) {
            return base64_encode(hash_hmac('sha256', $srcStr, $secretKey, true));
        }

        throw new \Exception(esc_html($method) . ' is not a supported encrypt method');
    }

    /**
     * _buildParamStr
     * 拼接参数
     *
     * @param array $requestParams 请求参数
     *
     * @return string
     */
    protected static function _buildParamStr(array $requestParams): string
    {
        $paramStr = '';
        ksort($requestParams);
        $i = 0;
        foreach ($requestParams as $key => $value) {
            if ($key === 'Signature') {
                continue;
            }

            // 把 参数中的 _ 替换成 .
            if (strpos($key, '_')) {
                $key = str_replace('_', '.', $key);
            }

            if ($i == 0) {
                $paramStr .= '?';
            } else {
                $paramStr .= '&';
            }

            if (is_array($value)) {
                $paramStr .= $key . '=' . self::_buildParamStr($value);
            } else {
                $paramStr .= $key . '=' . $value;
            }
            ++$i;
        }

        return $paramStr;
    }


    /**
     * 验证签名是否正确
     *
     * @param string $sign  需要校验的签名
     * @param array  $param 参数
     * @param string $secretKey
     *
     * @return bool
     */
    static function verify(string $sign, array $param, string $secretKey): bool
    {
        return strcmp(self::doSign($param, $secretKey), $sign) === 0;
    }
}
