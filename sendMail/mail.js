function sendMail(){
    
    var params = {
        name:       document.getElementById("name").value,
        email:      document.getElementById("email").value,
        message:    document.getElementById("message").value,
        phone:      document.getElementById("phone").value,
    };

    const serviceID = "service_sr99eah";
    const temlateID = "template_2b2vbr5";

    emailjs
        .send(serviceID, temlateID, params)
        .then(
        res => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            document.getElementById("phone").value = "";
            console.log(res);
            alert("Your messgae sen successfully!");
        })
        .catch(console.log("Send Failed!"));
}


