#!/usr/bin/env sh

# ȷ���ű��׳������Ĵ���
set -e

# ���ɾ�̬�ļ�
npm run docs:build

# �������ɵ��ļ���
cd docs/.vuepress/dist

# ����Ƿ������Զ�������
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# ��������� https://ShenJinyong.github.io
# git push -f git@github.com:ShenJinyong/ShenJinyong.github.io.git master

# ��������� https://ShenJinyong.github.io/javaboy
git push -f git@github.com:ShenJinyong/javaboy.git master:gh-pages

cd -