from scrapy.spider import Spider
from scrapy.selector import Selector
from scrapy.http import Request
from dirbot.items import Website

BASE_URL = 'http://www.foundalis.com/res/bps'


class DmozSpider(Spider):
    name = "dmoz"
    allowed_domains = ["foundalis.com"]
    start_urls = [
        "http://www.foundalis.com/res/bps/bpidx.htm"
    ]

    def parse(self, response):
        sel = Selector(response)
        sites = sel.xpath('//table[@border="2"]')
        sites = [site.xpath('//td/a') for site in sites]
        all_urls = sites[0]# + sites[1]
        print len(all_urls)
        for site in all_urls:
            url = site.xpath('@href').extract()[0]
            print url
            yield Request('%s/%s' % (BASE_URL, url),
                          callback=self.parse_single)

    def parse_single(self, response):
        w = Website()
        path = response.url.split('/')
        number = path[-1].split('.')[0].lstrip('p0')
        author = path[-2]
        image_base = path[:-1]
        hxs = Selector(response)
        image = hxs.xpath('//img/@src').extract()[0]
        image_base.append(image)
        w['number'] = number
        w['author'] = author
        w['image_urls'] = ['/'.join(image_base)]
        return w
