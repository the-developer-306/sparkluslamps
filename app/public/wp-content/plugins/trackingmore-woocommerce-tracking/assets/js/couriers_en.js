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
        "name": "Fedex",
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
        "name": "China EMS",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "china-post",
        "name": "China Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "singapore-post",
        "name": "Singapore Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "singapore-speedpost",
        "name": "Singapore Speedpost",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "hong-kong-post",
        "name": "Hong Kong Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "swiss-post",
        "name": "Swiss Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "usps",
        "name": "USPS",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "royal-mail",
        "name": "United Kingdom Royal Mail",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "parcel-force",
        "name": "Parcel Force",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "postnl-parcels",
        "name": "Netherlands Post - PostNL",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "netherlands-post",
        "name": "Netherlands Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "australia-post",
        "name": "Australia Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "australia-ems",
        "name": "Australia EMS",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "canada-post",
        "name": "Canada Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "new-zealand-post",
        "name": "New Zealand Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "belgium-post",
        "name": "Bpost",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "brazil-correios",
        "name": "Brazil Correios",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "russian-post",
        "name": "Russian Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "sweden-posten",
        "name": "Sweden Posten",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "laposte",
        "name": "La Poste",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "chronopost",
        "name": "France EMS - Chronopost",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "colissimo",
        "name": "Colissimo",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "poste-italiane",
        "name": "Poste Italiane",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "india-post",
        "name": "India Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "magyar-posta",
        "name": "Magyar Posta",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "yanwen",
        "name": "YANWEN",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "dhl-germany",
        "name": "Deutsche Post DHL",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "an-post",
        "name": "An Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "dhlparcel-nl",
        "name": "DHL Parcel Netherlands",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "dhl-poland",
        "name": "DHL Poland Domestic",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "dhl-es",
        "name": "DHL Spain Domestic",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "correos-mexico",
        "name": "Mexico Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "posten-norge",
        "name": "Posten Norge",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "tnt-it",
        "name": "TNT Italy",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "tnt-fr",
        "name": "TNT France",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "ctt",
        "name": "Portugal Post - CTT",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "south-africa-post",
        "name": "South African Post Office",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "correos-spain",
        "name": "Correos",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "taiwan-post",
        "name": "Taiwan Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "ukraine-post",
        "name": "Ukraine Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "ukraine-ems",
        "name": "Ukraine EMS",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "emirates-post",
        "name": "Emirates Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "uruguay-post",
        "name": "Uruguay Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "japan-post",
        "name": "Japan Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "posta-romana",
        "name": "Poșta Română",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "korea-post",
        "name": "Korea Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "greece-post",
        "name": "ELTA Hellenic Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "deutsche-post",
        "name": "Deutsche Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "czech-post",
        "name": "Česká Pošta",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "correos-chile",
        "name": "Correos Chile",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "aland-post",
        "name": "Åland Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "macao-post",
        "name": "Macao Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "wishpost",
        "name": "WishPost",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "pfcexpress",
        "name": "PFC Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "yunexpress",
        "name": "Yun Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "cnexps",
        "name": "CNE Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "buylogic",
        "name": "Buylogic",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "4px",
        "name": "4PX",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "anjun",
        "name": "Anjun Logistics",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "j-net",
        "name": "J-NET Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "miuson-international",
        "name": "Miuson Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "sfb2c",
        "name": "SF International",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "sf-express",
        "name": "S.F Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "sto",
        "name": "STO Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "yto",
        "name": "YTO Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "ttkd",
        "name": "TTKD Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "jd",
        "name": "JD Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "zto",
        "name": "ZTO Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "zjs-express",
        "name": "ZJS International",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "yunda",
        "name": "Yunda Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "deppon",
        "name": "DEPPON",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "xqwl",
        "name": "XQ Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "chukou1",
        "name": "Chukou1 Logistics",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "xru",
        "name": "XRU",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "ruston",
        "name": "Ruston",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "qfkd",
        "name": "QFKD Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "nanjingwoyuan",
        "name": "Nanjing Woyuan",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "hhexp",
        "name": "Hua Han Logistics",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "flytexpress",
        "name": "Flyt Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "al8856",
        "name": "Ali Business Logistics",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "jcex",
        "name": "JCEX",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "dpe-express",
        "name": "DPE Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "lwehk",
        "name": "Logistic Worldwide Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "equick-cn",
        "name": "Equick China",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "cuckooexpress",
        "name": "Cuckoo Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "dwz",
        "name": "DWZ Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "takesend",
        "name": "Takesend Logistics",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "cainiao",
        "name": "Aliexpress Standard Shipping",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "tgx",
        "name": "TGX",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "aus",
        "name": "Ausworld Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "ewe",
        "name": "EWE global express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "sudan-post",
        "name": "Sudan Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "syrian-post",
        "name": "Syrian Post",
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
        "slug": "allekurier",
        "name": "allekurier",
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
        "slug": "transrush",
        "name": "Transrush",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "tanzania-post",
        "name": "Tanzania Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "ste56",
        "name": "Suteng Logistics",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "thailand-post",
        "name": "Thailand Post",
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
        "slug": "winit",
        "name": "Winit",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "togo-post",
        "name": "Togo Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "qexpress",
        "name": "QEXPRESS",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "tonga-post",
        "name": "Tonga Post",
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
        "slug": "360zebra",
        "name": "360zebra",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "chinz56",
        "name": "CHINZ LOGISTICS",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "tunisia-post",
        "name": "Tunisia Post",
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
        "slug": "auexpress",
        "name": "Auexpress",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "turkey-post",
        "name": "Turkey Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "dpd-hk",
        "name": "DPD(HK)",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "fedex-uk",
        "name": "FedEx UK",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "uganda-post",
        "name": "Uganda Post",
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
        "slug": "ztky",
        "name": "Zhongtie logistic",
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
        "slug": "skynetworldwide-uk",
        "name": "Skynet Worldwide Express UK",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "idada56",
        "name": "Dada logistic",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "rufengda",
        "name": "Rufengda",
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
        "slug": "nightline",
        "name": "Nightline",
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
        "slug": "uzbekistan-post",
        "name": "Uzbekistan Post",
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
        "slug": "far800",
        "name": "Far International Logistics",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "vanuatu-post",
        "name": "Vanuatu Post",
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
        "slug": "dhl-parcel-nl",
        "name": "DHL Netherlands",
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
        "slug": "roadbull",
        "name": "Roadbull Logistics",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "vietnam-post",
        "name": "Vietnam Post",
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
        "slug": "estes",
        "name": "Estes",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "saicheng",
        "name": "Sai Cheng Logistics",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "yemen-post",
        "name": "Yemen Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "zambia-post",
        "name": "Zambia Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "8europe",
        "name": "8europe",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "zimbabwe-post",
        "name": "Zimbabwe Post",
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
        "slug": "globegistics",
        "name": "Globegistics Inc",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "suyd56",
        "name": "SYD Express",
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
        "slug": "tk-kit",
        "name": "Tk Kit",
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
        "slug": "overnitenet",
        "name": "Overnite Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "hermes-de",
        "name": "Hermes Germany",
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
        "slug": "abf",
        "name": "ABF Freight",
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
        "slug": "matkahuolto",
        "name": "Matkahuolto",
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
        "slug": "acscourier",
        "name": "ACS Courier",
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
        "slug": "afghan-post",
        "name": "Afghan Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "dpd-poland",
        "name": "DPD Poland",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "posta-shqiptare",
        "name": "Albania Post",
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
        "slug": "cess",
        "name": "Cess",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "andorra-post",
        "name": "Andorra Post",
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
        "slug": "bestex",
        "name": "Best Express",
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
        "slug": "adicional",
        "name": "Adicional Logistics",
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
        "slug": "antilles-post",
        "name": "Antilles Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "correo-argentino",
        "name": "Argentina Post",
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
        "slug": "armenia-post",
        "name": "Armenia Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "aruba-post",
        "name": "Aruba Post",
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
        "slug": "austria-post",
        "name": "Austrian Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "azerbaijan-post",
        "name": "Azerbaijan Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "bahrain-post",
        "name": "Bahrain Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "bangladesh-ems",
        "name": "Bangladesh EMS",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "barbados-post",
        "name": "Barbados Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "belpochta",
        "name": "Belarus Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "belize-post",
        "name": "Belize Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "benin-post",
        "name": "Benin Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "bermuda-post",
        "name": "Bermuda Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "bhutan-post",
        "name": "Bhutan Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "correos-bolivia",
        "name": "Bolivia Post",
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
        "slug": "bosnia-and-herzegovina-post",
        "name": "Bosnia And Herzegovina Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "botswana-post",
        "name": "Botswana Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "brunei-post",
        "name": "Brunei Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "bulgaria-post",
        "name": "Bulgaria Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "sonapost",
        "name": "Burkina Faso Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "burundi-post",
        "name": "Burundi Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "sinoair",
        "name": "SINOAIR",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "cambodia-post",
        "name": "Cambodia Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "campost",
        "name": "Cameroon Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "italy-sda",
        "name": "Italy SDA",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "correios-cabo-verde",
        "name": "Correios Cabo Verde",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "t-cat",
        "name": "T Cat",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "fastgo",
        "name": "Fastgo",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "colombia-post",
        "name": "Colombia Post",
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
        "slug": "pca",
        "name": "PCA",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "citylinkexpress",
        "name": "City-Link Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "ftd",
        "name": "FTD Express",
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
        "slug": "correos-de-costa-rica",
        "name": "Costa Rica Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "shipgce",
        "name": "Shipgce Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "freakyquick",
        "name": "freaky quick logistics",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "hrvatska-posta",
        "name": "Croatia Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "xend",
        "name": "Xend Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "cuba-post",
        "name": "Cuba Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "wise-express",
        "name": "Wise Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "sure56",
        "name": "Sure56",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "cyprus-post",
        "name": "Cyprus Post",
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
        "slug": "gaticn",
        "name": "GATI Courier",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "cnpex",
        "name": "Cnpex",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "denmark-post",
        "name": "Denmark post",
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
        "slug": "szdpex",
        "name": "DPEX China",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "1hcang",
        "name": "1hcang",
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
        "slug": "tea-post",
        "name": "Tea post",
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
        "slug": "correos-del-ecuador",
        "name": "Ecuador Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "sunyou",
        "name": "Sunyou",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "egypt-post",
        "name": "Egypt Post",
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
        "slug": "el-salvador-post",
        "name": "El Salvador Post",
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
        "slug": "ghn",
        "name": "Giao Hàng Nhanh",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "eritrea-post",
        "name": "Eritrea Post",
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
        "slug": "omniva",
        "name": "Estonia Post",
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
        "slug": "ethiopia-post",
        "name": "Ethiopia Post",
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
        "slug": "faroe-islands-post",
        "name": "Faroe Islands Post",
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
        "slug": "fiji-post",
        "name": "Fiji Post",
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
        "slug": "finland-posti",
        "name": "Finland Post - Posti",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "jiayi56",
        "name": "Jiayi Express",
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
        "slug": "maxcellents",
        "name": "Maxcellents Pte Ltd",
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
        "slug": "georgian-post",
        "name": "Georgia Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "rpxonline",
        "name": "RPX Online",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "ghana-post",
        "name": "Ghana Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "gibraltar-post",
        "name": "Gibraltar  Post",
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
        "slug": "espeedpost",
        "name": "Espeedpost",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "tele-post",
        "name": "Greenland Post",
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
        "slug": "elcorreo",
        "name": "Guatemala Post",
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
        "slug": "guernsey-post",
        "name": "Guernsey Post",
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
        "slug": "nuvoex",
        "name": "NuvoEx",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "ets-express",
        "name": "ETS Express",
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
        "slug": "parcelled-in",
        "name": "Parcelled.in",
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
        "slug": "toll",
        "name": "TOLL",
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
        "slug": "quantium",
        "name": "Quantium",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "iceland-post",
        "name": "Iceland Post",
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
        "slug": "alpha-fast",
        "name": "Alpha Fast",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "omniparcel",
        "name": "Omni Parcel",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "indonesia-post",
        "name": "Indonesia Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "skynet",
        "name": "SkyNet Malaysia",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "cdek",
        "name": "CDEK Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "iran-post",
        "name": "Iran Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "trackon",
        "name": "Trackon Courier",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "israel-post",
        "name": "Israel Post",
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
        "name": "OCS Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "ivory-coast-ems",
        "name": "Ivory Coast EMS",
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
        "slug": "jamaica-post",
        "name": "Jamaica Post",
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
        "slug": "jordan-post",
        "name": "Jordan Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "oneworldexpress",
        "name": "One World Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "kazpost",
        "name": "Kazakhstan Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "adsone",
        "name": "ADSOne",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "bsi",
        "name": "BSI express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "kenya-post",
        "name": "Kenya Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "landmark-global",
        "name": "Landmark Global",
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
        "slug": "smsa-express",
        "name": "SMSA Express",
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
        "slug": "costmeticsnow",
        "name": "Cosmetics Now",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "blueskyexpress",
        "name": "Blue Sky Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "kyrgyzpost",
        "name": "Kyrgyzstan Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "sfcservice",
        "name": "SFC Service",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "laos-post",
        "name": "Laos Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "latvijas-pasts",
        "name": "Latvia Post",
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
        "slug": "liban-post",
        "name": "Lebanon Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "lesotho-post",
        "name": "Lesotho Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "dhlglobalmail",
        "name": "DHL ECommerce",
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
        "slug": "dpd-uk",
        "name": "DPD UK",
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
        "slug": "liechtenstein-post",
        "name": "Liechtenstein Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "lietuvos-pastas",
        "name": "Lithuania Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "luxembourg-post",
        "name": "Luxembourg Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "gls-italy",
        "name": "GLS Italy",
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
        "slug": "dsv",
        "name": "DSV",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "star-track",
        "name": "Star Track Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "macedonia-post",
        "name": "Macedonia Post",
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
        "slug": "imlb2c",
        "name": "IML Logistics",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "dpd-ireland",
        "name": "DPD Ireland",
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
        "slug": "toll-ipec",
        "name": "Toll IPEC",
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
        "slug": "hivewms",
        "name": "HiveWMS",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "malaysia-post",
        "name": "Malaysia Post",
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
        "slug": "cpacket",
        "name": "CPacket",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "maldives-post",
        "name": "Maldives Post",
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
        "slug": "cacesapostal",
        "name": "Cacesa Postal",
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
        "slug": "malta-post",
        "name": "Malta Post",
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
        "slug": "bondscouriers",
        "name": "Bonds Couriers",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "uskyexpress",
        "name": "Uskyexpress",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "kerry-logistics",
        "name": "Kerry Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "mauritius-post",
        "name": "Mauritius Post",
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
        "slug": "arkexpress",
        "name": "Ark express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "moldova-post",
        "name": "Moldova Post",
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
        "slug": "acommerce",
        "name": "ACOMMERCE",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "la-poste-monaco",
        "name": "Monaco Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "139express",
        "name": "139 ECONOMIC Package",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "monaco-ems",
        "name": "Monaco EMS",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "mongol-post",
        "name": "Mongol Post",
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
        "slug": "posta-crne-gore",
        "name": "Montenegro Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "fastway-nz",
        "name": "Fastway New Zealand",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "poste-maroc",
        "name": "Maroc Poste",
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
        "slug": "fastway-au",
        "name": "Fastway Australia",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "directfreight-au",
        "name": "Direct Freight",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "fastway-ie",
        "name": "Fastway Ireland",
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
        "slug": "namibia-post",
        "name": "Namibia Post",
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
        "slug": "kye",
        "name": "KUAYUE EXPRESS",
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
        "slug": "arrowxl",
        "name": "Arrow XL",
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
        "slug": "colis-prive",
        "name": "Colis Privé",
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
        "slug": "lasership",
        "name": "Lasership",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "kjkd",
        "name": "Fast Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "china-russia56",
        "name": "China Russia56",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "new-caledonia-post",
        "name": "New Caledonia Post",
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
        "slug": "dmm-network",
        "name": "DMM Network",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "nicaragua-post",
        "name": "Nicaragua Post",
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
        "slug": "fetchr",
        "name": "Fetchr",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "opek",
        "name": "FedEx Poland Domestic",
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
        "slug": "efspost",
        "name": "EFSPost",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "nigeria-post",
        "name": "Nigeria Post",
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
        "slug": "skynetworldwide",
        "name": "SkyNet Worldwide Express",
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
        "slug": "eyoupost",
        "name": "Eyou800",
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
        "slug": "imexglobalsolutions",
        "name": "IMEX Global Solutions",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "oman-post",
        "name": "Oman Post",
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
        "slug": "easy-mail",
        "name": "Easy Mail",
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
        "slug": "idexpress",
        "name": "IDEX",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "fd-express",
        "name": "FD Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "rosan",
        "name": "ROSAN EXPRESS",
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
        "slug": "wsgd-logistics",
        "name": "WSGD Logistics",
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
        "slug": "con-way",
        "name": "Con-way Freight",
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
        "slug": "zes-express",
        "name": "ESHUN International Logistics",
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
        "slug": "speedexcourier",
        "name": "Speedex Courier",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "overseas-territory-fr-ems",
        "name": "Overseas Territory FR EMS",
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
        "slug": "utec",
        "name": "utec",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "taqbin-jp",
        "name": "Yamato Japan",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "spsr",
        "name": "SPSR",
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
        "slug": "flywayex",
        "name": "Flyway Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "jiaji",
        "name": "CNEX",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "sagawa",
        "name": "Sagawa",
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
        "slug": "xdexpress",
        "name": "XDEXPRESS",
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
        "slug": "courier-it",
        "name": "Courier IT",
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
        "slug": "qichen",
        "name": "venucia",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "overseas-territory-us-post",
        "name": "Overseas Territory US Post",
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
        "slug": "ups-mi",
        "name": "UPS Mail Innovations",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "pakistan-post",
        "name": "Pakistan Post",
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
        "slug": "jam-express",
        "name": "Jam Express",
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
        "slug": "dawn-wing",
        "name": "Dawn Wing",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "138sd",
        "name": "138sd",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "correos-panama",
        "name": "Panama Post",
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
        "slug": "fastrak-services",
        "name": "Fastrak Services",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "postpng",
        "name": "Papua New Guinea Post",
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
        "slug": "correo-paraguayo",
        "name": "Paraguay Post",
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
        "slug": "serpost",
        "name": "Serpost",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "phlpost",
        "name": "Philippines Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "poczta-polska",
        "name": "Poland Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "wiseloads",
        "name": "wiseloads",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "uc-express",
        "name": "UC Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "wndirect",
        "name": "wndirect",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "iposita-rwanda",
        "name": "Rwanda Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "eurodis",
        "name": "Eurodis",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "saint-lucia-post",
        "name": "Saint Lucia Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "matdespatch",
        "name": "Matdespatch",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "svgpost",
        "name": "Saint Vincent And The Grenadines",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "samoa-post",
        "name": "Samoa Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "tnt-au",
        "name": "TNT Australia",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "san-marino-post",
        "name": "San Marino Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "yakit",
        "name": "yakit",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "saudi-post",
        "name": "Saudi Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "senegal-post",
        "name": "Senegal Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "serbia-post",
        "name": "Serbia Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "taqbin-hk",
        "name": "TAQBIN HongKong",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "seychelles-post",
        "name": "Seychelles Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "ubonex",
        "name": "UBon  Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "8dt",
        "name": "Profit Fields",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "slovakia-post",
        "name": "Slovakia Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "slovenia-post",
        "name": "Slovenia Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "2uex",
        "name": "2U Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "solomon-post",
        "name": "Solomon Post",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "ane66",
        "name": "Ane Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "huidaex",
        "name": "Huida Express",
        "other_name": "",
        "required_fields": ""
      },
      {
        "slug": "aplus100",
        "name": "A PLUS EXPRESS",
        "other_name": "",
        "required_fields": ""
      }];
    return data;
}
