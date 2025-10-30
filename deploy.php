<?php
namespace Deployer;

require 'recipe/common.php';

// Config

set('repository', 'git@github.com:AurelienLab/portfolio.git');

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

// Hosts

host('prod')
    ->set('hostname', '46.224.26.37')
    ->set('remote_user', 'web-server')
    ->set('deploy_path', '/srv/web/aurelienlab.dev')
    ->set('branch', 'master')
;

// Hooks

after('deploy:failed', 'deploy:unlock');
