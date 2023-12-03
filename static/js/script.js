$(document).ready(function () {
    /*------- button with class register -------*/
    var SVMpredict_btn = $('.container .btn_predictSVM');
    var LRpredict_btn = $('.container .btn_predictLR');
    var CMPpredict_btn = $('.container .btn_predictCmp');
    /*------- button with class sign in --------*/
    var reset_btn = $('.container .btn_reset');
    /*------- back button ----------------------*/
    var back_btn = $('.container .back');

    var messageInput = $('input[name="message"]');
    var sentence = $('.container h3:contains("sentence : null")');
    var result = $('.container h3:contains("Result : null")');
    var resultSVM = $('.container h3:contains("Result SVM : null")');
    var resultLR = $('.container h3:contains("Result LR : null")');
    var textPredict = ''
    // function animation ของ svm and LR
    function showAnimation(Predict_btn) {
        Predict_btn.siblings('.reg').css({
            'transform': 'translateY(40%) scale(5)',
            'border-radius': '0',
            'width': '100%',
            'height': '100%',
        });

        Predict_btn.siblings('.container h3:nth-of-type(1)').css({
            'top': '25%',
            'z-index': '8',
        });

        Predict_btn.siblings('.container h3:nth-of-type(2)').css({
            'top': '55%',
            'z-index': '8',
            'font-size': '25px',
        });
    }

    // animation หน้า compare
    function CMPshowAnimation(Predict_btn){
        CMPpredict_btn.siblings('.reg').css({
            'transform': 'translateY(40%) scale(5)',
            'border-radius': '0',
            'width': '100%',
            'height': '100%'
        }).end();
        CMPpredict_btn.siblings('.container h3:nth-of-type(1)').css({
            'top': '25%',
            'z-index': '8',
            
        }).end().end();
        CMPpredict_btn.siblings('.container h3:nth-of-type(2)').css({
            'top': '55%',
            'z-index': '8',
            'font-size': '25px',
        }).end().end().end();
        CMPpredict_btn.siblings('.container h3:nth-of-type(3)').css({
            'top': '65%',
            'z-index': '8',
            'font-size': '25px',
        }).end().end().end();
        CMPpredict_btn.siblings('.container a').css({
            'top': '80%',
            'z-index': '8',
        }).end().end().end().end();
    }

    //ปุ่ม predict ในหน้า svm
    SVMpredict_btn.click(function (e) {
        e.preventDefault();
        var message = messageInput.val();
        if (message.trim() === '') {
            alert('กรุณาป้อนข้อความที่ต้องการทำนายก่อนครับ. :)');
            // $('#messageAlert').show();
            return;
        }
        $.post('/predict_wSVM', { message: message }, function (data) {
            if (data && data.pre_SVM) {
                if(data.pre_SVM[0] == '0'){
                    textPredict = "Negative"
                }
                else if(data.pre_SVM[0] == '1'){
                    textPredict = "Neutral"
                }
                else if(data.pre_SVM[0] == '2'){
                    textPredict = "Positive"
                }
                sentence.text('Sentence : ' + message);
                result.text('Result from SVM: ' + textPredict);
                showAnimation(SVMpredict_btn);
            }
        });
        // messageInput.val('');
        $('.reg').on('click', function() {
            $('.reg').css({
              'transform': 'translateY(-100%) scale(1)',
              'border-radius': '50px',
              'width': '20px',
              'height': '20px'
            })
            $('.container h3:nth-of-type(1)').css({
                'top': '-100%',
            }).end().end();
            $('.container h3:nth-of-type(2)').css({
                'top': '-100%',
            }).end().end().end();
            messageInput.val('');
          });
    });


    reset_btn.on('click', function (e) {
        e.preventDefault();
        messageInput.val('');
    });

    //ปุ่ม predict หน้า Logistic
    LRpredict_btn.click(function (e) {
        e.preventDefault();
        var message = messageInput.val();
        if (message.trim() === '') {
            alert('กรุณาป้อนข้อความที่ต้องการทำนายก่อนครับ. :)');
            return;
        }
        $.post('/predict_Logistic', { message: message }, function (data) {
            if (data && data.pre_Logistic) {
                if(data.pre_Logistic[0] == '0'){
                    textPredict = "Negative"
                }
                else if(data.pre_Logistic[0] == '1'){
                    textPredict = "Neutral"
                }
                else if(data.pre_Logistic[0] == '2'){
                    textPredict = "Positive"
                }
                sentence.text('Sentence : ' + message);
                result.text('Result from LR : ' + textPredict);
                showAnimation(LRpredict_btn);
            }
        });
        // messageInput.val('');
        $('.reg').on('click', function() {
            $('.reg').css({
              'transform': 'translateY(-100%) scale(1)',
              'border-radius': '50px',
              'width': '20px',
              'height': '20px'
            })
            $('.container h3:nth-of-type(1)').css({
                'top': '-100%',
            }).end().end();
            $('.container h3:nth-of-type(2)').css({
                'top': '-100%',
            }).end().end().end();
            messageInput.val('');
          });    

    });

    CMPpredict_btn.click(function (e) {
        e.preventDefault();
        var message = messageInput.val();
        if (message.trim() === '') {
            alert('กรุณาป้อนข้อความที่ต้องการทำนายก่อนครับ. :)');
            return;
        }
        $.post('/predict_wCompare', { message: message }, function (data) {
            if (data && data.pre_Logistic && data.pre_SVM) {
                var textSvmPre = ''
                var textLRPre = ''
                if(data.pre_SVM[0] == '0'){
                    textSvmPre = "Negative"
                }
                else if(data.pre_SVM[0] == '1'){
                    textSvmPre = "Neutral"
                }
                else if(data.pre_SVM[0] == '2'){
                    textSvmPre = "Positive"
                }

                if(data.pre_Logistic[0] == '0'){
                    textLRPre = "Negative"
                }
                else if(data.pre_Logistic[0] == '1'){
                    textLRPre = "Neutral"
                }
                else if(data.pre_Logistic[0] == '2'){
                    textLRPre = "Positive"
                }
                sentence.text('Sentence : ' + message);
                resultSVM.text('Result from SVM: ' + textSvmPre);
                resultLR.text('Result from LR: ' + textLRPre);
                CMPshowAnimation();

            }
        });
        // messageInput.val('');
        $('.reg').on('click', function() {
            $('.reg').css({
              'transform': 'translateY(-100%) scale(1)',
              'border-radius': '50px',
              'width': '20px',
              'height': '20px'
            })
            $('.container h3:nth-of-type(1)').css({
                'top': '-100%',
            }).end().end();
            $('.container h3:nth-of-type(2)').css({
                'top': '-100%',
            }).end().end().end();
            $('.container h3:nth-of-type(3)').css({
                'top': '-100%',
            }).end().end().end().end();
            messageInput.val('');
          });       
        
    });
});

