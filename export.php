<?php

header("Content-Type: text/html");
header("Content-Transfer-Encoding: Binary");
header("Content-disposition: attachment; filename=\"particles.html\""); 

?>
<!--
@projectDescription   Canvas Particles Test

@author   Diego Vilariño - http://www.ensegundoplano.com - @ensegundoplano - http://www.sond3.com
@version  0.1
-->
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>html5 canvas particle generator</title>
        <meta name="description" content="html5 canvas particle generato">
        <meta name="keywords" content="html5, canvas, particle, generator, ensegundoplano, diego, vilariño, sond3">
        <meta name="generator" content="ensegundoplano">
        <meta name="author" content="ensegundoplano">
        <style>
        <?php echo file_get_contents("styles.css"); ?>
        </style>
    </head>
    <body>
        <a href="https://github.com/leebradley/Html5-canvas-particles" target="_blank"><img style="position: absolute; top: 0; left: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_left_white_ffffff.png" alt="Fork me on GitHub"></a>
        <canvas id="canvas">
            Sorry, your browser cannot support canvas tag.
        </canvas>

        <script>window.export_search = "<?php echo $_SERVER["QUERY_STRING"]; ?>";</script>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script>
        <?php

        echo file_get_contents("libs/Stats.js");
        echo file_get_contents("libs/RequestAnimationFrame.js");
        echo file_get_contents("libs/dat.gui.min.js");
        echo file_get_contents("libs/jsurl.js");
        echo file_get_contents("libs/Utils.js");
        echo file_get_contents("main.js");

        ?>
        </script>

    </body>
</html>
