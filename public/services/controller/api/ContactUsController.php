<?php

session_start();
require_once PROJECT_ROOT_PATH . "/inc/PHPMailer.php";

// if ( ! isset( $_SESSION['user'] ) )
// {
//     send_unauthorized();
// }

class ContactUsController extends BaseController
{

    public function getWebsiteContacts()
    {

        // echo $_SESSION['user']."<br>";

        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'GET') {

            try {

                $configModel = new ContactUsModel();

                if (isset($_GET['startDate'])) {
                    $startDate = htmlspecialchars($_GET["startDate"]);
                } else {
                    $startDate = date('Y-m-01');
                }

                if (isset($_GET['endDate'])) {
                    $endDate = htmlspecialchars($_GET["endDate"]);
                } else {
                    date_default_timezone_set('Asia/Kolkata');
                    $endDate = date('Y-m-d H:i:s');
                }

                if (isset($startDate) && isset($endDate)) {
                    $responseData = $configModel->getWebsiteContacts($startDate, $endDate);
                    for ($i = 0; $i < count($responseData); $i++) {
                         if(($responseData[$i]['status'] == 1) || ($responseData[$i]['assignto'] !=null)) {
                             
                            $responseData[$i]['status'] = 1;
                            // echo $responseData[$i]['status'];
                         }
                    }
                }

            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . ' Something went wrong!';
            }
        } else {
            $strErrorDesc = 'Method not supported';
        }

        if (!$strErrorDesc) {
            $this->sendSuccess($responseData);
        } else {
            $this->sendError($strErrorDesc);
        }
    }

    public function insertWebsiteContacts()
    {
        $logoImg = SMTP_LOGO . '/assets/app_logo.png';
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'POST') {
            try {

                $configModel = new ContactUsModel();

                if (isset($_POST['name'])) {
                    $name = htmlspecialchars($_POST["name"]);
                }

                if (isset($_POST['email'])) {
                    $email = htmlspecialchars($_POST["email"]);
                }
                if (isset($_POST['phone'])) {
                    $phone = htmlspecialchars($_POST["phone"]);
                }

                if (isset($_POST['message'])) {
                    $message = htmlspecialchars($_POST["message"]);
                }

                if (isset($_POST['subject'])) {
                    $subject = htmlspecialchars($_POST["subject"]);
                }

                if (isset($_POST['remarks'])) {
                    $remarks = htmlspecialchars($_POST["remarks"]);
                } else {
                    $remarks = "";
                }

                if (isset($_POST['assignTo'])) {
                    $assignTo = htmlspecialchars($_POST["assignTo"]);
                } else {
                    $assignTo = "";
                }


                if (isset($name) && isset($email)) {

                    $responseData = $configModel->insertWebsiteContacts($name, $email, $phone, $message, $subject, $remarks, $assignTo);

                    if ($responseData['message'] == "Inserted Successfully!!") {
                        if ($subject === "ContactUs") {
                            $this->sendMailToContactUs($name, $phone, $email, $message, $logoImg);
                        } else if ($subject == "SentRefer") {
                            $this->sendMailToReferCode($message, $logoImg);
                        } else if ($subject === "Referral") {
                            $this->sendMailToReferViaEmail($name, $phone, $email, $message, $logoImg);
                        } else {
                            // FIX ME LATER IF NEEDED
                        }
                    }
                }
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . ' Something went wrong!';
            }
        } else {
            $strErrorDesc = 'Method not supported';
        }

        if (!$strErrorDesc) {
            $this->sendSuccess($responseData);
        } else {
            $this->sendError($strErrorDesc);
        }
    }

    public function updateWebsiteContacts()
    {

        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'POST') {
            try {

                $configModel = new ContactUsModel();

                if (isset($_POST['id'])) {
                    $id = htmlspecialchars($_POST["id"]);
                }

                if (isset($_POST['remarks'])) {
                    $remarks = htmlspecialchars($_POST["remarks"]);
                }
                if (isset($_POST['assignTo'])) {
                    $assignTo = htmlspecialchars($_POST["assignTo"]);
                }

                if (isset($id)) {

                    $responseData = $configModel->updateWebsiteContacts($id, $remarks, $assignTo);
                }
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . ' Something went wrong!';
            }
        } else {
            $strErrorDesc = 'Method not supported';
        }

        if (!$strErrorDesc) {
            $this->sendSuccess($responseData);
        } else {
            $this->sendError($strErrorDesc);
        }
    }

    public function deleteWebsiteContacts()
    {

        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'POST') {

            try {
                $contactModel = new ContactUsModel();

                $deleteIDList = json_decode($_POST['idList']);;

                if (isset($deleteIDList)) {
                    $responseData = $contactModel->deleteWebsiteContacts($deleteIDList);

                    // $responseData = json_encode($configData);
                    // $responseData = $configData;
                }
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . ' Something went wrong!';
            }
        } else {
            $strErrorDesc = 'Method not supported';
        }

        if (!$strErrorDesc) {
            $this->sendSuccess($responseData);
        } else {
            $this->sendError($strErrorDesc);
        }
    }

    public function sendMailToContactUs($contact_name, $contact_mobile, $contact_email, $contact_message, $logoImg)
    {

        $subject = 'Tradejini- New Contact Details';
        $message = '<table style="background-color:#f7f7f7;font-size:13px;height:100%;width:100%" cellpadding="0" cellspacing="0">
            <tbody>
                <tr>
                    <td align="center" valign="top">
                        <table style="font-size:13px" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td colspan="3">
        
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3" style="border:1px solid #c7c7c7;background-color:#ffffff;padding:15px" valign="top" width="568">
                                        <a href="<?php echo site_url();?>" class="logo">
                                            <img src=' . $logoImg . ' style="width:222px;"/>
                                        </a><br/>
                                            <h3 style="color:#663399;">New Contact Details</h3><br/><br/>
                                            <b style="font-weight: bold;">Name      :</b>' . $contact_name . '<br><br/>	
                                            <b style="font-weight: bold;">Email Id  :</b>' . $contact_email . '<br><br/>	
                                            <b style="font-weight: bold;">Phone     :</b>' . $contact_mobile . '<br><br/>	
                                            <b style="font-weight: bold;">Message   :</b>' . $contact_message . '<br><br/>	
                                        
                                        <font>Team,<br/>
                                            Tradejini<br/> 
                                            <a href="http://tradejini.com/" target="_blank">www.Tradejini.com</a>
                                        </font>
                                        <font style="float: right;">help@tradejini.com</font>
                                    </td>
                                </tr>
                        </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>';
        mailer($subject, $message);
    }

    public function sendMailToReferCode($code, $logoImg)
    {
        $subject = 'Tradejini';
        $message = '<table style="background-color:#f7f7f7;font-size:13px;height:100%;width:100%" cellpadding="0" cellspacing="0">
					<tbody>
						<tr>
							<td align="center" valign="top">
								<table style="font-size:13px" cellpadding="0" cellspacing="0">
									<tbody>
										<tr>
											<td colspan="3">

											</td>
										</tr>
										<tr>
											<td colspan="3" style="border:1px solid #c7c7c7;background-color:#ffffff;padding:15px" valign="top" width="568">
												<a href="<?php echo site_url();?>" class="logo">
													<img src=' . $logoImg . ' style="width:222px;"/>
												</a><br/><br/><br/>
												  
													<b style="font-weight: bold;">Your friend wants to share this site with you: </b><a href="http://tradejini.com/">tradejini.com</a><br/><br/>
													<b style="font-weight: bold;"></b>' . $code . '<br><br/>
													<br/><br/>
												
												<font>Team,<br/>
													Tradejini<br/> 
													<a href="http://tradejini.com/" target="_blank">www.Tradejini.com</a>
												</font>
												<font style="float: right;">help@tradejini.com</font>
											</td>
										</tr>
								</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>';
        mailer($subject, $message);
    }

    public function sendMailToReferViaEmail($contact_name, $contact_mobile, $contact_email, $contact_code, $logoImg)
    {
        $subject = 'Tradejini- New Referral Details';
        $message = '<table style="background-color:#f7f7f7;font-size:13px;height:100%;width:100%" cellpadding="0" cellspacing="0">
					<tbody>
						<tr>
							<td align="center" valign="top">
								<table style="font-size:13px" cellpadding="0" cellspacing="0">
									<tbody>
										<tr>
											<td colspan="3">

											</td>
										</tr>
										<tr>
											<td colspan="3" style="border:1px solid #c7c7c7;background-color:#ffffff;padding:15px" valign="top" width="568">
												<a href="<?php echo site_url();?>" class="logo">
													<img src=' . $logoImg . ' style="width:222px;"/>
												</a><br/>
												    <h3 style="color:#663399;">New Referral Details</h3><br/><br/>
													<b style="font-weight: bold;">Name      :</b>' . $contact_name . '<br><br/>	
													<b style="font-weight: bold;">Email Id  :</b>' . $contact_email . '<br><br/>	
													<b style="font-weight: bold;">Phone     :</b>' . $contact_mobile . '<br><br/>	
													<b style="font-weight: bold;"></b>' . $contact_code . '<br><br/>	
												
												<font>Team,<br/>
													Tradejini<br/> 
													<a href="http://tradejini.com/" target="_blank">www.Tradejini.com</a>
												</font>
												<font style="float: right;">help@tradejini.com</font>
											</td>
										</tr>
								</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>';
        mailer($subject, $message);
    }
}
