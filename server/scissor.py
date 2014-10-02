# -*- coding: utf-8 -*-
import os
import Image

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

IMAGE_BAKUP = os.path.join(BASE_DIR, 'images/components')

# real image size is (98, 98) after cut the border
# but we need more clean image, so get 96*96
IMAGE_SIZE = (96, 96)

image_x2 = lambda x: x + IMAGE_SIZE[0]
image_y2 = lambda y: y + IMAGE_SIZE[1]

IMAGE_POSITIONS = [
    (9, 7),
    (117, 7),
    (9, 115),
    (117, 115),
    (9, 223),
    (117, 223),
    (302, 7),
    (410, 7),
    (302, 115),
    (410, 115),
    (302, 223),
    (410, 223)
]


class Scissor(object):
    def crop_whole(self, i):
        image_path = os.path.join(BASE_DIR, 'images/full/%s.jpg' % i)
        dir_path = os.path.join(IMAGE_BAKUP, str(i))
        try:
            os.mkdir(dir_path)
        except:
            pass
        im = Image.open(image_path)
        for index, image_position in enumerate(IMAGE_POSITIONS):
            _type = 1 if index < 6 else 2
            file_name = '%s%s.jpg' % (_type, (index % 6) + 1)
            box = (image_position[0], image_position[1],
                   image_x2(image_position[0]), image_y2(image_position[1]))
            file_path = os.path.join(dir_path, file_name)
            self.crop_one(im, box, file_path)

    def crop_one(self, im, box, file_path):
        region = im.crop(box)
        region.save(file_path)

if __name__ == '__main__':
    s = Scissor()
    for i in range(1, 281):
        s.crop_whole(i)
