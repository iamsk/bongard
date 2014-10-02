from scrapy.item import Item, Field


class Website(Item):

    number = Field()
    author = Field()
    image_urls = Field()
    images = Field()
