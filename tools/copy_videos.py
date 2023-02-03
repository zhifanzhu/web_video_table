import os
import os.path as osp
import shutil
import glob
from argparse import ArgumentParser
import tqdm

def parse_args():
    parser = ArgumentParser()
    parser.add_argument('src', help='source directory')  #  e.g. ~/ihoi/outputs/2023-01-29/12-37-51/
    parser.add_argument('dst', help='destination directory')  # public/results-Jan-29
    return parser.parse_args()


if __name__ == '__main__':
    args = parse_args()
    mask_videos_dir = '/home/skynet/Zhifan/ihoi/outputs/tmp/v3_mask_videos_occlude/'
    videos = glob.glob(osp.join(args.src, '*_action.mp4'))
    num_missing = 0
    os.makedirs(args.dst, exist_ok=True)
    for video in tqdm.tqdm(videos):
        mask_basename = osp.basename(video.replace('_action', ''))
        shutil.copyfile(video, osp.join(args.dst, osp.basename(video)))
        if not osp.exists(osp.join(mask_videos_dir, mask_basename)):
            print('missing', mask_basename)
            num_missing += 1
            continue
        shutil.copyfile(osp.join(mask_videos_dir, mask_basename),
                        osp.join(args.dst, osp.basename(video).replace('_action', '_mask')))
    print("num_missing", num_missing)
