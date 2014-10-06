# -*- coding: utf-8 -*-

import csv
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
    bps_dict = {}
    for bp in new_bps:
        if bp[2] in ['S', 'M', 'H', 'C'] and bp[3]:
            bps_dict[bp[0]] = bp[2]
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
    bps = load(open('test.json'))
    new_bps = get_new_bps()
    for bp in bps:
        if not bp['number'].isdigit():
            continue
        if bp['number'] in new_bps:
            cp = get_check_point(bp['number'], bp['author'])
            level = LEVELS[new_bps[bp['number']]]
            tpl['checkPointTypes'][level]['checkPoints'].append(cp)
    tpl['checkPointTypes'][2]['checkPoints'] = tpl['checkPointTypes'][3]['checkPoints'][25:]
    for i in range(4):
        tpl['checkPointTypes'][i]['checkPoints'] = tpl['checkPointTypes'][i]['checkPoints'][:20]
    dump(tpl, open('/Users/zhangbin/workspace/bongard/src/client/www/js/data/'
                   'gameInfo.json', 'w'))


if __name__ == '__main__':
    run()
