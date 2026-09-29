# 配对锁

静态题页。部署在 https://bosprimigenious.github.io/pair-lock/

题面在 `index.html`。密文和矩阵在 `puzzle.json`。

解开方式有两条，得到同一张图：

1. 自己求代价矩阵的唯一最小代价完美匹配，按题面拼密钥，解密 `pair_blob_b64`。公开页不附带求解器。
2. 知道直解口令时，按题面的 PBKDF2 参数解密 `direct_blob_b64`。口令不在本仓库。
