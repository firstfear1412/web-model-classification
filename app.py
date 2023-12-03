from flask import Flask,render_template,request, jsonify
import pickle
import joblib

app = Flask(__name__) #ตั้งให้หน้านี้เป็นหน้าเเรก


@app.route('/')
def index():
    return render_template('index.html',pre = 'noPre')

@app.route('/LogisticPage')
def LogisticPage():
    return render_template('LogisticPage.html',pre = 'noPre')

@app.route('/ComparePages')
def ComparePages():
    return render_template('ComparePages.html',pre_NaiveBayes= 'noPre',pre_SVM = 'noPre')

@app.route('/predict_wSVM', methods=['POST'])
def predict_wSVM():
    load_vec = joblib.load('vec_svm.pkl')
    load_model_svm = joblib.load('svm_model.pkl')
    
    if request.method =='POST':
        message  = request.form['message']
        result = [message]
   
    message_tranform = load_vec.transform(result)
    prediction_resultSVM = load_model_svm.predict(message_tranform)
    
    response_data = {
        'pre_SVM': prediction_resultSVM.tolist()
    }
    return jsonify(response_data)

@app.route('/predict_Logistic', methods=['POST'])
def predict_wLogistic():
    load_vec = joblib.load('vec_logistic.pkl')
    load_model_Logistic = joblib.load('model_logistic.pkl')
    
    if request.method =='POST':
        message  = request.form['message']
        result = [message]
   
    message_tranform = load_vec.transform(result)
    prediction_resultLogistic = load_model_Logistic.predict(message_tranform)
    
    response_data = {
        'pre_Logistic': prediction_resultLogistic.tolist()
    }
    return jsonify(response_data)

@app.route('/predict_wCompare', methods=['POST'])
def predict_wCompare():
    load_vec_lr = joblib.load('vec_logistic.pkl')
    load_model_lr = joblib.load('model_logistic.pkl')

    load_vec_svm = joblib.load('vec_svm.pkl')
    load_model_svm = joblib.load('svm_model.pkl')
    
    if request.method == 'POST':
        message = request.form['message']
        result = [message]
    message_tranform_SVM = load_vec_svm.transform(result)
    prediction_result_SVM = load_model_svm.predict(message_tranform_SVM)


    message_tranform_lr = load_vec_lr.transform(result)
    prediction_result_lr = load_model_lr.predict(message_tranform_lr)
    
    # Return the prediction results as JSON response
    response_data = {
        'pre_Logistic': prediction_result_lr.tolist(),
        'pre_SVM': prediction_result_SVM.tolist()
    }
    return jsonify(response_data)
if __name__ == '__main__':
    app.run()
    
    
