function get_couriers() {
	var data = [
    {
      "slug": "dhl",
      "name": "DHL",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ups",
      "name": "UPS",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "fedex",
      "name": "Fedex-联邦快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "tnt",
      "name": "TNT",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "china-ems",
      "name": "中国 EMS",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "china-post",
      "name": "中国邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "singapore-post",
      "name": "新加坡邮政(小包)",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "singapore-speedpost",
      "name": "新加坡特快专递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "hong-kong-post",
      "name": "香港邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "swiss-post",
      "name": "瑞士邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "usps",
      "name": "美国邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "royal-mail",
      "name": "英国皇家邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "parcel-force",
      "name": "英国邮政parcelforce",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "postnl-parcels",
      "name": "荷兰邮政-PostNL",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "netherlands-post",
      "name": "荷兰邮政(大包)",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "australia-post",
      "name": "澳大利亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "australia-ems",
      "name": "澳大利亚 EMS",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "canada-post",
      "name": "加拿大邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "new-zealand-post",
      "name": "新西兰邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "belgium-post",
      "name": "比利时邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "brazil-correios",
      "name": "巴西邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "russian-post",
      "name": "俄罗斯邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "sweden-posten",
      "name": "瑞典邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "laposte",
      "name": "法国邮政-La Poste",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "chronopost",
      "name": "法国 EMS-Chronopost",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "colissimo",
      "name": "法国邮政-Colissimo",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "poste-italiane",
      "name": "意大利邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "india-post",
      "name": "印度邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "magyar-posta",
      "name": "匈牙利邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "yanwen",
      "name": "燕文",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dhl-germany",
      "name": "德国DHL",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "an-post",
      "name": "爱尔兰邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dhlparcel-nl",
      "name": "荷兰DHL",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dhl-poland",
      "name": "波兰DHL",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dhl-es",
      "name": "西班牙DHL",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "correos-mexico",
      "name": "墨西哥邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "posten-norge",
      "name": "挪威邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "tnt-it",
      "name": "意大利TNT",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "tnt-fr",
      "name": "法国TNT",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ctt",
      "name": "葡萄牙邮政-CTT",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "south-africa-post",
      "name": "南非邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "correos-spain",
      "name": "西班牙邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "taiwan-post",
      "name": "台湾邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ukraine-post",
      "name": "乌克兰邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ukraine-ems",
      "name": "乌克兰 EMS",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "emirates-post",
      "name": "阿联酋邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "uruguay-post",
      "name": "乌拉圭邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "posta-romana",
      "name": "罗马尼亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "japan-post",
      "name": "日本邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "korea-post",
      "name": "韩国邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "greece-post",
      "name": "希腊邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "deutsche-post",
      "name": "德国邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "czech-post",
      "name": "捷克邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "correos-chile",
      "name": "智利邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "aland-post",
      "name": "奥兰群岛芬兰邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "macao-post",
      "name": "澳门邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "wishpost",
      "name": "Wish邮",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "pfcexpress",
      "name": "PFC皇家物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "yunexpress",
      "name": "云途物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "cnexps",
      "name": "CNE国际快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "sfcservice",
      "name": "三态速递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "buylogic",
      "name": "捷买送",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "4px",
      "name": "递四方",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "anjun",
      "name": "安骏物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "j-net",
      "name": "J-NET捷网",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "miuson-international",
      "name": "深圳淼信国际物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "sfb2c",
      "name": "顺丰国际",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "sf-express",
      "name": "顺丰速递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "sto",
      "name": "申通快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "yto",
      "name": "圆通快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ttkd",
      "name": "天天快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "jd",
      "name": "京东快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "zto",
      "name": "中通快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "zjs-express",
      "name": "宅急送快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "yunda",
      "name": "韵达快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "deppon",
      "name": "德邦物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "xqwl",
      "name": "星前物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "chukou1",
      "name": "出口易",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "xru",
      "name": "XRU-俄速递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ruston",
      "name": "Ruston俄速通",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "qfkd",
      "name": "全峰快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "nanjingwoyuan",
      "name": "南京沃源",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "hhexp",
      "name": "华翰物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "flytexpress",
      "name": "飞特物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "al8856",
      "name": "阿里电商物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "jcex",
      "name": "JCEX佳成",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dpe-express",
      "name": "递必易",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "lwehk",
      "name": "利威国际物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "equick-cn",
      "name": "EQUICK国际快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "cuckooexpress",
      "name": "布谷鸟速递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dwz",
      "name": "递五洲国际物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "takesend",
      "name": "泰嘉物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "cainiao",
      "name": "速卖通线上物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "tgx",
      "name": "TGX精英速运",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "new-caledonia-post",
      "name": "新喀里多尼亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "viettelpost",
      "name": "Viettel Post",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "aus",
      "name": "澳世速递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dotzot",
      "name": "Dotzot",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "syrian-post",
      "name": "叙利亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "bondscouriers",
      "name": "Bonds Couriers",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ewe",
      "name": "EWE全球快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "jamaica-post",
      "name": "牙买加邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "kangaroo-my",
      "name": "Kangaroo Worldwide Express",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "armenia-post",
      "name": "亚美尼亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "courierpost",
      "name": "CourierPost",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ste56",
      "name": "速腾快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "yemen-post",
      "name": "也门邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "directfreight-au",
      "name": "Direct Freight快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "iran-post",
      "name": "伊朗邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "allekurier",
      "name": "AlleKurier",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "israel-post",
      "name": "以色列邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "transrush",
      "name": "转运四方",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "indonesia-post",
      "name": "印度尼西亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "winit",
      "name": "winit万邑通",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "qexpress",
      "name": "新西兰易达通",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "360zebra",
      "name": "斑马物联网",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "jordan-post",
      "name": "约旦邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "chinz56",
      "name": "秦远物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "vietnam-post",
      "name": "越南邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "auexpress",
      "name": "澳邮中国快运AuExpress",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "zambia-post",
      "name": "赞比亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "freakyquick",
      "name": "FQ狂派速递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "gibraltar-post",
      "name": "直布罗陀邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dpd-hk",
      "name": "香港DPD",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ztky",
      "name": "中铁物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "tnt-click",
      "name": "TNT Click",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "idada56",
      "name": "大达物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "rufengda",
      "name": "如风达",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "mailamericas",
      "name": "MailAmericas",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "far800",
      "name": "泛远国际物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "saicheng",
      "name": "赛诚国际物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "8europe",
      "name": "败欧洲",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "posta-shqiptare",
      "name": "阿尔巴尼亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "tk-kit",
      "name": "Tk Kit",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "afghan-post",
      "name": "阿富汗邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "suyd56",
      "name": "速邮达物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "correo-argentino",
      "name": "阿根廷邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "asendia-hk",
      "name": "Asendia HK",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "aruba-post",
      "name": "阿鲁巴邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "oman-post",
      "name": "阿曼邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "azerbaijan-post",
      "name": "阿塞拜疆邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "overnitenet",
      "name": "Overnite印度快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "nexive",
      "name": "Nexive",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "egypt-post",
      "name": "埃及邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "abf",
      "name": "ABF Freight",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ethiopia-post",
      "name": "埃塞俄比亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "omniva",
      "name": "爱沙尼亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "couriers-please",
      "name": "Couriers Please",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "andorra-post",
      "name": "安道尔邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "gofly",
      "name": "Gofly",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "austria-post",
      "name": "奥地利邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "cess",
      "name": "国通快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "barbados-post",
      "name": "巴巴多斯邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "bestex",
      "name": "百世快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "postpng",
      "name": "巴布亚新几内亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "rl-carriers",
      "name": "RL Carriers",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "chronopost-portugal",
      "name": "Chronopost Portugal",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "pakistan-post",
      "name": "巴基斯坦邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "correo-paraguayo",
      "name": "巴拉圭邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "wsgd-logistics",
      "name": "WSGD物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "bahrain-post",
      "name": "巴林邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "envialia",
      "name": "Envialia",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "inpost-paczkomaty",
      "name": "InPost Paczkomaty",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "correos-panama",
      "name": "巴拿马邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "canpar",
      "name": "Canpar Courier",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "star-track",
      "name": "Star Track 快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "belpochta",
      "name": "白俄罗斯邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "17postservice",
      "name": "17 Post Service",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "imexglobalsolutions",
      "name": "IMEX Global Solutions",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "bermuda-post",
      "name": "百慕大邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "easy-mail",
      "name": "Easy Mail",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "bulgaria-post",
      "name": "保加利亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "idexpress",
      "name": "IDEX",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "benin-post",
      "name": "贝宁邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "rrdonnelley",
      "name": "RR Donnelley",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ninjavan",
      "name": "Ninja Van",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "iceland-post",
      "name": "冰岛邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "xpressbees",
      "name": "XpressBees",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "bosnia-and-herzegovina-post",
      "name": "波黑邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "courier-it",
      "name": "Courier IT",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "poczta-polska",
      "name": "波兰邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "139express",
      "name": "139快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "specialised-freight",
      "name": "Specialised Freight",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "correos-bolivia",
      "name": "玻利维亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "acommerce",
      "name": "ACommerce",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ups-mi",
      "name": "UPS Mail Innovations",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "belize-post",
      "name": "伯利兹邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ubi-logistics",
      "name": "UBI Logistics Australia",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dpe-south-africa",
      "name": "DPE South Africa",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "botswana-post",
      "name": "博茨瓦纳邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "kgmhub",
      "name": "KGM Hub",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dawn-wing",
      "name": "Dawn Wing",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "bhutan-post",
      "name": "不丹邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "qxpress",
      "name": "Qxpress",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "con-way",
      "name": "Con-way Freight",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "sonapost",
      "name": "布基纳法索邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "parcel-express",
      "name": "Parcel Express",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "speedexcourier",
      "name": "Speedex Courier",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "burundi-post",
      "name": "布隆迪邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "srekorea",
      "name": "SRE Korea",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "expeditors",
      "name": "Expeditors",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "serpost",
      "name": "秘鲁邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "taqbin-jp",
      "name": "Yamato宅急便",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "nova-poshta",
      "name": "Nova Poshta",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "sagawa",
      "name": "佐川急便Sagawa",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "uc-express",
      "name": "优速快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "abxexpress-my",
      "name": "ABX Express",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "denmark-post",
      "name": "丹麦邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "mypostonline",
      "name": "Mypostonline",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "fastrak-services",
      "name": "Fastrak Services",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "jam-express",
      "name": "Jam Express",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "roadbull",
      "name": "Roadbull Logistics",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "jayonexpress",
      "name": "Jayon Express (JEX)",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dhl-parcel-nl",
      "name": "DHL Netherlands",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "togo-post",
      "name": "多哥邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "rpx",
      "name": "RPX Indonesia",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dhl-benelux",
      "name": "DHL Benelux",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "mrw-spain",
      "name": "MRW",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "sinoair",
      "name": "中外运",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "packlink",
      "name": "Packlink",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "colis-prive",
      "name": "Colis Privé",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "italy-sda",
      "name": "意大利SDA",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "correos-del-ecuador",
      "name": "厄瓜多尔邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dmm-network",
      "name": "DMM Network",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "eritrea-post",
      "name": "厄立特里亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "opek",
      "name": "波兰FedEx",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "sgt-it",
      "name": "SGT Corriere Espresso",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "t-cat",
      "name": "黑貓宅急便",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ec-firstclass",
      "name": "EC-Firstclass",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "fastgo",
      "name": "速派快递FastGo",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "faroe-islands-post",
      "name": "法罗群岛邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "wedo",
      "name": "WeDo Logistics",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "pca",
      "name": "PCA",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "phlpost",
      "name": "菲律宾邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "empsexpress",
      "name": "EMPS Express",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "fiji-post",
      "name": "斐济邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "cpacket",
      "name": "CPacket",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ftd",
      "name": "富腾达快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "finland-posti",
      "name": "芬兰邮政-Posti",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "Correios-Cabo-Verde",
      "name": "佛得角邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "raiderex",
      "name": "RaidereX",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "shipgce",
      "name": "飞洋快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "rzyexpress",
      "name": "RZY Express",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "airpak-express",
      "name": "Airpak Express",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "wise-express",
      "name": "万色速递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "sure56",
      "name": "速尔快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "lbcexpress",
      "name": "LBC Express",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "gaticn",
      "name": "GATI上海迦递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "colombia-post",
      "name": "哥伦比亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "pandulogistics",
      "name": "Pandu Logistics",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "cnpex",
      "name": "中邮快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "correos-de-costa-rica",
      "name": "哥斯达黎加邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "fedex-uk",
      "name": "英国FedEx",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "szdpex",
      "name": "DPEX国际快递（中国）",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "collectplus",
      "name": "Collect+",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "1hcang",
      "name": "1号仓",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "tele-post",
      "name": "格陵兰岛邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "skynetworldwide-uk",
      "name": "Skynet Worldwide Express UK",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "georgian-post",
      "name": "格鲁吉亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "hermes",
      "name": "Hermesworld",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "tea-post",
      "name": "亚欧快运TEA",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "nightline",
      "name": "Nightline",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "guernsey-post",
      "name": "根西岛邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "apc",
      "name": "APC Postal Logistics",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "sunyou",
      "name": "顺友物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "cuba-post",
      "name": "古巴邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "newgistics",
      "name": "Newgistics",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "old-dominion",
      "name": "Old Dominion Freight Line",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dhlecommerce-asia",
      "name": "DHL Global Mail Asia",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "kazpost",
      "name": "哈萨克斯坦邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "estes",
      "name": "Estes",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "greyhound",
      "name": "Greyhound",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dhl-active",
      "name": "DHL Active Tracing",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "globegistics",
      "name": "Globegistics Inc",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "tnt-reference",
      "name": "TNT Reference",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "hermes-de",
      "name": "德国Hermes",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "overseas-territory-fr-ems",
      "name": "海外领地法国 EMS",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "international-seur",
      "name": "International Seur",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "trakpak",
      "name": "TrakPak",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "jiayi56",
      "name": "佳怡物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "matkahuolto",
      "name": "Matkahuolto",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "overseas-territory-us-post",
      "name": "海外领地美国邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "acscourier",
      "name": "ACS Courier",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "deltec-courier",
      "name": "Deltec Courier",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dpd-poland",
      "name": "波兰DPD",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "taxydromiki",
      "name": "Geniki Taxydromiki",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "adicional",
      "name": "Adicional Logistics",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "cbl-logistica",
      "name": "CBL Logistics",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "redur-es",
      "name": "Redur Spain",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "siodemka",
      "name": "Siodemka",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "exapaq",
      "name": "Exapaq",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "espeedpost",
      "name": "易速国际物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "antilles-post",
      "name": "荷属安的列斯荷兰邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "posta-crne-gore",
      "name": "黑山邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "kyrgyzpost",
      "name": "吉尔吉斯斯坦邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ets-express",
      "name": "俄通收",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ghana-post",
      "name": "加纳邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "cambodia-post",
      "name": "柬埔寨邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "zimbabwe-post",
      "name": "津巴布韦邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "campost",
      "name": "喀麦隆邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "gls",
      "name": "GLS",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "bartolini",
      "name": "BRT Bartolini",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dpd",
      "name": "DPD",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "maxcellents",
      "name": "Maxcellents Pte Ltd",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "aramex",
      "name": "Aramex",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "postnl-3s",
      "name": "PostNL International 3S",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ocschina",
      "name": "OCS国际快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ivory-coast-ems",
      "name": "科特迪瓦 EMS",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "toll",
      "name": "TOLL",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "naqel",
      "name": "Naqel",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "hrvatska-posta",
      "name": "克罗地亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "nationwide-my",
      "name": "Nationwide Express",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "kenya-post",
      "name": "肯尼亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "cdek",
      "name": "CDEK快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "parcel",
      "name": "Pitney Bowes",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "rpxonline",
      "name": "RPX保时达国际快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "trackon",
      "name": "Trackon",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "latvijas-pasts",
      "name": "拉脱维亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "bsi",
      "name": "佰事达",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "lesotho-post",
      "name": "莱索托邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "nhans-solutions",
      "name": "Nhans Solutions",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "laos-post",
      "name": "老挝邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "oneworldexpress",
      "name": "万欧国际",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "liban-post",
      "name": "黎巴嫩邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "jet-ship",
      "name": "Jet-Ship Worldwide",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "lietuvos-pastas",
      "name": "立陶宛邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "jayeek",
      "name": "Jayeek",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ecargo-asia",
      "name": "Ecargo",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "blueskyexpress",
      "name": "蓝天快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "liechtenstein-post",
      "name": "列支敦士登邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "delhivery",
      "name": "Delhivery",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "luxembourg-post",
      "name": "卢森堡邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "iposita-rwanda",
      "name": "卢旺达邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "quantium",
      "name": "冠庭国际物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "alpha-fast",
      "name": "Alpha Fast快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "maldives-post",
      "name": "马尔代夫邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "omniparcel",
      "name": "Omni Parcel快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "malta-post",
      "name": "马耳他邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dhlglobalmail",
      "name": "DHL电子商务",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "adsone",
      "name": "ADSOne快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "landmark-global",
      "name": "Landmark Global快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "malaysia-post",
      "name": "马来西亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "smsa-express",
      "name": "SMSA快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dpd-uk",
      "name": "DPD UK",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "thecourierguy",
      "name": "The Courier Guy",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "macedonia-post",
      "name": "马其顿邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "tnt-uk",
      "name": "TNT UK",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "imlb2c",
      "name": "IML艾姆勒",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "mauritius-post",
      "name": "毛里求斯邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "gls-italy",
      "name": "意大利GLS",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "hivewms",
      "name": "海沧无忧",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "mongol-post",
      "name": "蒙古邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dsv",
      "name": "DSV",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "bangladesh-ems",
      "name": "孟加拉国 EMS",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "uskyexpress",
      "name": "全酋通Usky",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "toll-ipec",
      "name": "Toll IPEC",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "echo",
      "name": "Echo",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "moldova-post",
      "name": "摩尔多瓦邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "arkexpress",
      "name": "方舟国际速递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "poste-maroc",
      "name": "摩洛哥邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "la-poste-monaco",
      "name": "摩纳哥邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "asendia-usa",
      "name": "Asendia USA",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "monaco-ems",
      "name": "摩纳哥 EMS",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "asendia-uk",
      "name": "Asendia UK",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ontrac",
      "name": "OnTrac",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "yodel",
      "name": "Yodel",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "asendia-de",
      "name": "Asendia Germany",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "namibia-post",
      "name": "纳米比亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "kerry-logistics",
      "name": "嘉里大通物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "arrowxl",
      "name": "Arrow XL",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dpex",
      "name": "DPEX",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dpd-ireland",
      "name": "爱尔兰DPD",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "nicaragua-post",
      "name": "尼加拉瓜邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "kye",
      "name": "跨越速运",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "nigeria-post",
      "name": "尼日利亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "upu",
      "name": "UPU",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "kjkd",
      "name": "快捷快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "xdp-uk",
      "name": "XDP Express",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "purolator",
      "name": "Purolator",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "fetchr",
      "name": "Fetchr",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "china-russia56",
      "name": "俄必达A79",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "efspost",
      "name": "平安快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "bluedart",
      "name": "Bluedart",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "eyoupost",
      "name": "易友通",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "dtdc",
      "name": "DTDC",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "el-salvador-post",
      "name": "萨尔瓦多邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "fastway-nz",
      "name": "新西兰Fastway",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "serbia-post",
      "name": "塞尔维亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "gojavas",
      "name": "GoJavas",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "first-flight",
      "name": "First Flight",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "senegal-post",
      "name": "塞内加尔邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "gati-kwe",
      "name": "Gati-KWE",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "cyprus-post",
      "name": "塞浦路斯邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "fastway-au",
      "name": "澳大利亚Fastway",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "fd-express",
      "name": "方递物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "seychelles-post",
      "name": "塞舌尔邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "zes-express",
      "name": "俄顺国际物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "saudi-post",
      "name": "沙特阿拉伯邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "rosan",
      "name": "中乌融盛速递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "utec",
      "name": "UTEC瞬移达",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "fastway-ie",
      "name": "爱尔兰Fastway",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "flywayex",
      "name": "程光快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "jiaji",
      "name": "佳吉物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "saint-lucia-post",
      "name": "圣卢西亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "san-marino-post",
      "name": "圣马力诺邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "xdexpress",
      "name": "迅达速递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "svgpost",
      "name": "圣文森特和格林纳丁斯",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "i-parcel",
      "name": "I-parcel",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "slovakia-post",
      "name": "斯洛伐克邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "slovenia-post",
      "name": "斯洛文尼亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "13-ten",
      "name": "13ten",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "lasership",
      "name": "Lasership",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "sudan-post",
      "name": "苏丹邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "138sd",
      "name": "泰国138快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "kwt56",
      "name": "京华达物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "solomon-post",
      "name": "所罗门群岛邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "skynetworldwide",
      "name": "SkyNet国际快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "spsr",
      "name": "中俄快递SPSR",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "nuvoex",
      "name": "NuvoEx",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "thailand-post",
      "name": "泰国邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "parcelled-in",
      "name": "Parcelled.in",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "tanzania-post",
      "name": "坦桑尼亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ecom-express",
      "name": "Ecom Express",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "wiseloads",
      "name": "wiseloads快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "tonga-post",
      "name": "汤加邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "gdex",
      "name": "GDEX",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "wndirect",
      "name": "wndirect快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "tunisia-post",
      "name": "突尼斯邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "skynet",
      "name": "SkyNet",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "eurodis",
      "name": "Eurodis快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "turkey-post",
      "name": "土耳其邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "delcart-in",
      "name": "Delcart",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "matdespatch",
      "name": "Matdespatch快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "vanuatu-post",
      "name": "瓦努阿图邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "elcorreo",
      "name": "危地马拉邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "citylinkexpress",
      "name": "City-Link(信递联）",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "tnt-au",
      "name": "澳大利亚TNT",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "brunei-post",
      "name": "文莱邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "2go",
      "name": "2GO",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "yakit",
      "name": "yakit快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "uganda-post",
      "name": "乌干达邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "xend",
      "name": "Xend",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "cacesapostal",
      "name": "Cacesa南美专线",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "air21",
      "name": "AIR21",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "airspeed",
      "name": "Airspeed International Corporation",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "taqbin-hk",
      "name": "香港宅急便",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "uzbekistan-post",
      "name": "乌兹别克斯坦邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "raf",
      "name": "RAF Philippines",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ubonex",
      "name": "优邦速运",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "tiki",
      "name": "Tiki",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "8dt",
      "name": "永利八达通",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "samoa-post",
      "name": "西萨摩亚邮政",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "wahana",
      "name": "Wahana",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "2uex",
      "name": "优优速递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ghn",
      "name": "Giao Hàng Nhanh",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "ane66",
      "name": "安能物流",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "huidaex",
      "name": "美国汇达快递",
      "other_name": "",
      "required_fields": ""
    },
    {
      "slug": "aplus100",
      "name": "美国汉邦快递",
      "other_name": "",
      "required_fields": ""
    }
  ];
	return data;
}
