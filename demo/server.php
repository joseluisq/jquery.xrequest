<?php

echo json_encode(array(
    'time' => '<b>Server time:</b> ' . time(),
    'hash' => '<b>Server hash (md5):</b> ' . hash('md5', time())
));