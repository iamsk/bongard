# Scrapy settings for dirbot project
import os

SPIDER_MODULES = ['dirbot.spiders']
NEWSPIDER_MODULE = 'dirbot.spiders'
DEFAULT_ITEM_CLASS = 'dirbot.items.Website'

ITEM_PIPELINES = {'dirbot.pipelines.CustomImagesPipeline': 1}
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
IMAGES_STORE = os.path.join(BASE_DIR, 'images')
