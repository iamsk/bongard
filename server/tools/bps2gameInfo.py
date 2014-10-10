# -*- coding: utf-8 -*-

import os
import csv
import shutil
from json import load, dump

AUTHORS = {
    'bongard': 'Mikhail M. Bongard',
    'merse': 'Merse E. Gáspár',
    'barenbaum': 'Pablo Barenbaum',
    'ihde': 'Michael Ihde',
    'gunnarsson': 'Andreas Gunnarsson',
    'foundal': 'Harry E. Foundalis',
    'insana': 'Joseph A. L. Insana',
    'shanahan': 'Peter Shanahan',
    'howells': 'Matthew J. Howells',
    'doughof': 'Douglas R. Hofstadter',
}

LEVELS = {
    'S': 0,
    'M': 1,
    'H': 2,
    'C': 3
}


def get_new_bps():
    new_bps = csv.reader(file('bps.csv', 'rb'))
    bps_dict = {'S': [], 'M': [], 'H': [], 'C': []}
    for bp in new_bps:
        if bp[2] in LEVELS.keys():
            bps_dict[bp[2]].append((bp[1], int(bp[3])))
    for level in LEVELS.keys():
        bps_dict[level] = [bp[0] for bp in sorted(bps_dict[level], key=lambda x: x[1])]
    return bps_dict


def get_check_point(number, author):
    check_point = {
        "imagesPath": "./image/%s/" % number,
        "author": AUTHORS[author]
    }
    return check_point


tpl = {
    "version": "0.1.0",
    "checkPointTypes": [
        {
            "name": "simple",
            "checkPoints": []
        }, {
            "name": "medium",
            "checkPoints": []
        }, {
            "name": "hard",
            "checkPoints": []
        }, {
            "name": "complex",
            "checkPoints": []
        }
    ]
}


def run():
    shutil.rmtree('/Users/zhangbin/workspace/bongard/src/client/www/image')
    os.mkdir('/Users/zhangbin/workspace/bongard/src/client/www/image')
    old_bps = load(open('all_bps.json'))
    old_bps_dict = {x['number']: x['author'] for x in old_bps}
    new_bps = get_new_bps()
    for level, bps in new_bps.items():
        for number in bps:
            author = old_bps_dict[number]
            cp = get_check_point(number, author)
            tpl['checkPointTypes'][LEVELS[level]]['checkPoints'].append(cp)
            a = '/Users/zhangbin/workspace/bongard/server/images/components/%s' % number
            b = '/Users/zhangbin/workspace/bongard/src/client/www/image/%s' % number
            shutil.copytree(a, b)
    dump(tpl, open('/Users/zhangbin/workspace/bongard/src/client/www/js/data/'
                   'gameInfo.json', 'w'))


if __name__ == '__main__':
    run()
