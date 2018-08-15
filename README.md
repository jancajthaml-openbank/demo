# demo

## TODO FIX THESE

### lake

* name of process (lake) running in installed host may collide with other instalations, rename to lake

```
top - 06:28:51 up 1 day, 22:01,  1 user,  load average: 0.98, 0.77, 0.57
Tasks:  13 total,   1 running,  12 sleeping,   0 stopped,   0 zombie
%Cpu(s): 36.6 us, 16.7 sy,  0.0 ni, 46.7 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem :  3076052 total,   244800 free,   320444 used,  2510808 buff/cache
KiB Swap:   524284 total,   524280 free,        4 used.  2554420 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
   28 root      20   0  537548  16868   9444 S 105.0  0.5   1:53.68 linux-amd64
    1 root      20   0   56644   6604   5464 S   0.0  0.2   0:00.12 systemd
   20 root      20   0   46092   5524   5076 S   0.0  0.2   0:00.11 systemd-journal
   30 root      20   0  178408   2940   2556 S   0.0  0.1   0:00.00 rsyslogd
   38 root      20   0   12892   1568   1432 S   0.0  0.1   0:00.00 agetty
   42 root      20   0   65408   2928   2452 S   0.0  0.1   0:00.01 login
   43 root      20   0   12892   1656   1520 S   0.0  0.1   0:00.00 agetty
   46 root      20   0   12892   1648   1516 S   0.0  0.1   0:00.00 agetty
   48 root      20   0   12892   1652   1512 S   0.0  0.1   0:00.00 agetty
   49 root      20   0   12892   1656   1520 S   0.0  0.1   0:00.00 agetty
   50 root      20   0   12892   1748   1612 S   0.0  0.1   0:00.00 agetty
   58 root      20   0   18136   3208   2716 S   0.0  0.1   0:00.00 bash
   64 root      20   0   41056   3136   2648 R   0.0  0.1   0:00.03 top
```

* no prefix of debian package, should be `openbank-lake` instead of `lake`

```
dpkg-query -l | grep lake
ii  lake                      1.0.1                          amd64        Openbank messaging relay
```

* high CPU usage of lake even in idle state

> this may be due RecvNoWait in ZMQ

```
Tasks:  13 total,   1 running,  12 sleeping,   0 stopped,   0 zombie
%Cpu(s): 40.1 us, 12.4 sy,  0.0 ni, 47.5 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem :  3076052 total,   245204 free,   319932 used,  2510916 buff/cache
KiB Swap:   524284 total,   524280 free,        4 used.  2554932 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
   28 root      20   0  537548  16868   9444 S 105.0  0.5   3:29.13 linux-amd64
```

* no assertion of default `/etc/init/lake.conf` installation would fail

* no assertion of metrics directory `/opt/lake/metrics` metrics would not be persisted

---

### vault

* make as debian package

### wall

* make as debian package

### search

* make as debian package


