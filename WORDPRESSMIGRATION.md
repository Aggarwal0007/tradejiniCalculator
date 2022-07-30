# Migrate from one environment to other

 1. Install wordpress in specified environment.

 2. Make sure wordpress default page is running on specified url.

 3. Install All In One WP Migration v6.7.7.

        3.1 Find all-in-one wp migration plugin from here 
            git@ssh.dev.azure.com:v3/iouring/services-tradejini/tradejini-wordpress-website

 4. Move or insert backup filename.wpress file within "wp-content/ai1wm-backups/index.php".

 5. Go to wordpress dashboard -> All-In-One WP Migration -> Backups -> Find an uploaded .wpress file  and Restore it.

 6. If it shows uploaded file size limit exceeds. Follow below steps.

         6.1. Go to => wp-content/plugins/all-in-one-wp-migration/constants.php

         6.2. Update Max file size here => define( 'AI1WM_MAX_FILE_SIZE', 536870912 * 8 )

 7. Add below lines in wp-config.php

            header('X-Frame-Options: SAMEORIGIN');

            define( 'WP_AUTO_UPDATE_CORE', false );

 8. Add below lines in functions.php (selected theme file)

            add_filter( 'auto_update_plugin', '__return_false' );

            add_filter( 'auto_update_theme', '__return_false' );

 9. Add / update .htaccess files in below locations

       9.1 .htaccess
       9.2 wp-content/.htaccess
       9.3 wp-content/uploads/.htaccess
       9.4 wp-content/ai1wm-backups/.htaccess

       We could sample files from git@ssh.dev.azure.com:v3/iouring/services-tradejini/tradejini-wordpress-website/wordpressHtaccessBkup
