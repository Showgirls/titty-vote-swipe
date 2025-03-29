
<?php
// Simple installation script for Phukk Me website
// Upload this file to your server root and visit it in your browser

// Configuration
$title = "Phukk Me Installation Tool";
$success = false;
$error = false;
$message = "";

// Function to check if a directory is writable
function is_dir_writable($dir) {
    if (!file_exists($dir)) {
        @mkdir($dir, 0755, true);
    }
    return is_writable($dir);
}

// Process installation if requested
if (isset($_POST['install'])) {
    try {
        // Check index.html exists
        if (!file_exists('index.html')) {
            throw new Exception("index.html file not found. Please upload it first.");
        }
        
        // Check assets directory
        if (!is_dir('assets') || !is_readable('assets')) {
            throw new Exception("Assets directory not found or not readable. Please upload the assets folder first.");
        }
        
        // Create .htaccess if it doesn't exist
        if (!file_exists('.htaccess')) {
            $htaccess = <<<EOT
# Enable URL rewriting
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Don't rewrite files or directories
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  
  # Rewrite everything else to index.html to allow SPA routing
  RewriteRule ^ index.html [L]
</IfModule>
EOT;
            if (!file_put_contents('.htaccess', $htaccess)) {
                throw new Exception("Failed to create .htaccess file. Please ensure the directory is writable.");
            }
        }
        
        // Verify permissions
        if (!is_dir_writable('.')) {
            throw new Exception("The current directory is not writable. Please set proper permissions.");
        }
        
        // Installation was successful
        $success = true;
        $message = "Installation completed successfully! Your website should now be accessible.";
        
    } catch (Exception $e) {
        $error = true;
        $message = "Error: " . $e->getMessage();
    }
}

// Check system requirements
$requirements = [
    'php_version' => [
        'required' => '7.0.0',
        'current' => phpversion(),
        'status' => version_compare(phpversion(), '7.0.0', '>=')
    ],
    'mod_rewrite' => [
        'required' => 'Enabled',
        'current' => in_array('mod_rewrite', apache_get_modules()) ? 'Enabled' : 'Disabled',
        'status' => in_array('mod_rewrite', apache_get_modules())
    ],
    'directory_writable' => [
        'required' => 'Writable',
        'current' => is_writable('.') ? 'Writable' : 'Not writable',
        'status' => is_writable('.')
    ],
    'index_exists' => [
        'required' => 'Present',
        'current' => file_exists('index.html') ? 'Present' : 'Missing',
        'status' => file_exists('index.html')
    ],
    'assets_exists' => [
        'required' => 'Present',
        'current' => (is_dir('assets') && is_readable('assets')) ? 'Present' : 'Missing',
        'status' => (is_dir('assets') && is_readable('assets'))
    ]
];

// Determine if all requirements are met
$all_requirements_met = true;
foreach ($requirements as $req) {
    if (!$req['status']) {
        $all_requirements_met = false;
        break;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title; ?></title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            color: #333;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            text-align: left;
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
        th {
            background-color: #f5f5f5;
        }
        .pass {
            color: green;
        }
        .fail {
            color: red;
        }
        .message {
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .success {
            background-color: #d4edda;
            color: #155724;
        }
        .error {
            background-color: #f8d7da;
            color: #721c24;
        }
        .btn {
            display: inline-block;
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            font-size: 16px;
            border-radius: 5px;
            text-decoration: none;
        }
        .btn:hover {
            background-color: #0069d9;
        }
        .disabled {
            background-color: #6c757d;
            cursor: not-allowed;
        }
        .disabled:hover {
            background-color: #6c757d;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1><?php echo $title; ?></h1>
        
        <?php if ($success): ?>
            <div class="message success">
                <?php echo $message; ?>
                <p>You can now visit your website <a href="index.html">here</a>.</p>
                <p>Please delete this install.php file for security reasons.</p>
            </div>
        <?php elseif ($error): ?>
            <div class="message error"><?php echo $message; ?></div>
        <?php else: ?>
            <p>This tool will help you install and configure the Phukk Me website on your server.</p>
            <p>Before proceeding, please make sure you have uploaded the following files:</p>
            <ul>
                <li>index.html</li>
                <li>The entire "assets" folder</li>
            </ul>
            
            <h2>System Requirements Check</h2>
            <table>
                <tr>
                    <th>Requirement</th>
                    <th>Required</th>
                    <th>Current</th>
                    <th>Status</th>
                </tr>
                <?php foreach ($requirements as $name => $req): ?>
                <tr>
                    <td><?php echo ucwords(str_replace('_', ' ', $name)); ?></td>
                    <td><?php echo $req['required']; ?></td>
                    <td><?php echo $req['current']; ?></td>
                    <td class="<?php echo $req['status'] ? 'pass' : 'fail'; ?>">
                        <?php echo $req['status'] ? 'Pass' : 'Fail'; ?>
                    </td>
                </tr>
                <?php endforeach; ?>
            </table>
            
            <form method="post" action="">
                <input type="hidden" name="install" value="1">
                <button type="submit" class="btn <?php echo $all_requirements_met ? '' : 'disabled'; ?>" <?php echo $all_requirements_met ? '' : 'disabled'; ?>>
                    Install Now
                </button>
                <?php if (!$all_requirements_met): ?>
                    <p class="fail">Please fix the failed requirements before installing.</p>
                <?php endif; ?>
            </form>
        <?php endif; ?>
    </div>
</body>
</html>
