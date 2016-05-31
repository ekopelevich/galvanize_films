var postEndpoint = "http://localhost:3000/films";

$(document).ready(function(){
    attachSubmitHandler();
})

function attachSubmitHandler(){
    var form = $("#add-movie");
    form.on("submit", function(event){
        event.preventDefault();
        submitFormData(getFormData(), postEndpoint)
        .then(function(result){
            form.find(".message").text(result.message);
            form.find(".message").fadeIn(500).pause(2000).fadeOut(500);
        })
        .catch(function(result){
            var responseText = JSON.parse(result.responseText);
            form.find(".message").text(responseText.message);
            form.find(".message").fadeIn(500).delay(4000).fadeOut(500);
        });
    });
}

function getFormData(){
    var form = $("#add-movie");

    return {
        title: form.find("#title").val(),
        genre: form.find("#genre").val(),
        description: form.find("#description").val(),
        coverPicture: form.find("#cover-picture").val(),
        rating: form.find("#rating").val()
    };
}

function submitFormData(formData, url){
    return new Promise(function(resolve, reject){
        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: url,
            data: formData,
            success: resolve,
            error: reject
        });
    });
}
