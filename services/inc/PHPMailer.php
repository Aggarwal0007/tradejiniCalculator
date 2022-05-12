<?php
require_once PROJECT_ROOT_PATH . "/PHPMailer/PHPMailer.php";
require_once PROJECT_ROOT_PATH . "/PHPMailer/SMTP.php";
require_once PROJECT_ROOT_PATH . "/PHPMailer/Exception.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

function mailer($subject, $message)
{

    $phpmailer = new PHPMailer(true);
    $phpmailer->isSMTP();
    $phpmailer->isHTML(true);
    $phpmailer->Host       = SMTP_HOST;
    $phpmailer->Port       = SMTP_PORT;
    // $phpmailer->SMTPSecure = 'tls';
    $phpmailer->SMTPAuth   = SMTP_AUTH;
    $phpmailer->Username   = SMTP_USERNAME;
    $phpmailer->Password   = SMTP_PASSWORD;
    $phpmailer->From       = SMTP_FROM;
    $phpmailer->FromName   = SMTP_FROM_NAME;
    $phpmailer->addAddress(SMTP_TO_ADDRESS, SMTP_TO_NAME);
    $phpmailer->Subject = $subject;
    $phpmailer->Body = $message;
    $phpmailer->send();
}
