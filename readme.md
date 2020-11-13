Issue reproduction:

First ensure docker is installed.

Run the following commands to observe the failure on node-12:
```
docker-compose start ibmmq
docker-compose up node-12
```

OR
Run the following commands to observe the successful connection on node-10:
```
docker-compose start ibmmq
docker-compose up node-12
```

Here is the output running the code on my machine (node-12):
```bash
# I removed the build and pulling parts of this console dump
[~/github/ibmmq-issue (master)] $ docker-compose start ibmmq
Starting ibmmq ... done
[~/github/ibmmq-issue (master)] $ docker-compose up node-12
Starting ibmmq-issue_node-12_1 ... done
Attaching to ibmmq-issue_node-12_1
node-12_1  | Calling ConnxPromise
node-12_1  | Calling OpenPromise
node-12_1  | Calling Get
node-12_1  | PID 1 received SIGSEGV for address: 0x0
node-12_1  | /app/node_modules/segfault-handler/build/Release/segfault-handler.node(+0x2cb1)[0x7fc101cdfcb1]
node-12_1  | /app/node_modules/ibmmq/redist/lib64/../lib64/libmqe_r.so(+0x45536b)[0x7fc100ce536b]
node-12_1  | /app/node_modules/ibmmq/redist/lib64/../lib64/libmqe_r.so(+0x455cd8)[0x7fc100ce5cd8]
node-12_1  | /lib/x86_64-linux-gnu/libpthread.so.0(+0x110e0)[0x7fc104a970e0]
ibmmq-issue_node-12_1 exited with code 11
```
