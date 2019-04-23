<?php
// 设置最大使用内存和最长执行时间
ini_set("memory_limit", "1024M");
set_time_limit(120);

class ascii
{
    private $width, $height;

    function __construct()
    {
        $arr = $this->getParams();
        $this->width = $arr['width'];
        $this->height = $arr['height'];

        $colorArr = $this->getRgbColor($arr['img']);
        $asciiArr = $this->imgToAscii($colorArr);
        unset($colorArr);

        $filePath = $this->setCover($asciiArr);
        unset($asciiArr);

        echo $filePath;
    }


    /**
     * 获取图片参数
     *
     * @return array
     */
    function getParams()
    {
        $fileArr = $_FILES['file'];
        $filePath = $fileArr['tmp_name'];
        $file = file_get_contents($filePath);

        $img = imagecreatefromstring($file);
        $width = imagesx($img);
        $height = imagesy($img);

        return [
            'img' => $img,
            'width' => $width,
            'height' => $height
        ];
    }

    /**
     * 获取图片的rgb颜色
     *
     * @param object $img
     * @return array
     */
    function getRgbColor($img)
    {
        $tempArr = [];

        for ($h = 0; $h < $this->height; $h++) {
            for ($w = 0; $w < $this->width; $w++) {
                $rgb = imagecolorat($img, $w, $h);
                $r = ($rgb >> 16) & 0xFF;
                $g = ($rgb >> 8) & 0xFF;
                $b = $rgb & 0xFF;

                array_push($tempArr, [$r, $g, $b]);
            }
        }

        return $tempArr;
    }

    /**
     * 图片转ascii
     *
     * @param array $colorArr
     * @return array 
     */
    function imgToAscii($colorArr)
    {
        // ascii字符填充方案
        $asciiTwoArr = [
            ["@", "#", "&", "$", "%", "*", "o", "!", ";", "."],
            ["M", "N", "H", "Q", "$", "O", "C", "?", "7", ">", "!", ":", "–", ";", "."],
            ["@", "#", "%", "M", "N", "H", "Q", "$", "O", "C", "?", "7", ">", "!", ":", "-", ";", "."],
            ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "`", "~", "!", "@", "#", "$", "%", "^", "&", "<", "(", ")", "*", "+", "{", "}", ":", "\"", "?", ">", " ", "|"],
            ["$", "@", "B", "%", "8", "&", "W", "M", "#", "*", "o", "a", "h", "k", "b", "d", "p", "q", "w", "m", "Z", "O", "0", "Q", "L", "C", "J", "U", "Y", "X", "z", "c", "v", "u", "n", "x", "r", "j", "f", "t", "/", "\\", " | ", "(", ")", "1", "{ ", "}", "[", "]", " ? ", " - ", "_", " + ", "~", " < ", " > ", "i", "!", "l", "I", "; ", ": ", ", ", "\"", "^", "`", "'", "."],
            ["/", "|", "(", ")", "1", "{", "}", "$", "@", "B", "%", "8", "&", "W", "M", "#", "Z", "O", "0", "Q", "L", "C", "J", "U", "Y", "X", "*", "h", "k", "b", "d", "p", "q", "w", "m", "o", "a", "h", "k", "b", "d", "p", "q", "w", "m", "z", "c", "v", "u", "n", "x", "r", "j", "f", "t", "[", "]", "?", "-", "_", "+", "~", "<", ">", "i", "!", "l", "I", ";", ":", ",", "\"", "^", "`", "'", "."],
        ];
        $action = 2;
        $asciiArr = $asciiTwoArr[$action];
        $asciiLen = count($asciiArr);
        $tempStr = '';
        $tempArr = [];

        foreach ($colorArr as $i => $item) {
            $avg = ($item[0] + $item[1] + $item[2]) / 3;
            $pos = (int)(($avg / 255) * ($asciiLen - 1));
            $tempStr .= $asciiArr[$pos] . $asciiArr[$pos];

            if (($i + 1) % $this->width === 0 && $i !== 0) {
                array_push($tempArr, $tempStr);
                $tempStr = '';
            }
        }

        return $tempArr;
    }

    /**
     * 设置画布,保存图片,返回图片路径
     *
     * @param array $asciiArr
     * @return string
     */
    function setCover($asciiArr)
    {
        // 切除图片留白
        $scale = 0.935;
        $cover = imagecreate($this->width * 15 * $scale, $this->height * 15);

        imagecolorallocate($cover, 255, 255, 255);
        putenv('GDFONTPATH=' . realpath('.'));

        $fontColor = imagecolorallocate($cover, 0, 0, 0);
        $fontSize = 10;

        $filePath = 'images/temp.png';
        $fontPath = realpath('../fonts/consola.ttf');
        $deg = 0;

        foreach ($asciiArr as $i => $str) {
            $y = $i * 15;
            imagettftext($cover, $fontSize, $deg, 0, $y, $fontColor, $fontPath, $str);
        }



        // 画布宽度有损输出
        imagepng($cover, '../' . $filePath);
        imagedestroy($cover);




        // // 画布宽度无损输出，画质可能有损
        // $newCover = imagecreate($width * 15, $height * 15);
        // // 缩放画布填充到新画布中
        // imagecopyresampled($newCover, $cover, 0, 0, 0, 0, $width * 15, $height * 15, $width * 15 * $scale, $height * 15);
        // imagepng($newCover, '../' . $filePath);
        // imagedestroy($cover);
        // imagedestroy($newCover);



        return $filePath;
    }
}

new ascii();
