// // @ts-ignore
// import * as ort from 'onnxruntime';
// import * as fs from 'fs';

// // Load label mappings
// const label2id = JSON.parse(fs.readFileSync('resource/label2id.joblib', 'utf-8'));
// const id2label = JSON.parse(fs.readFileSync('resource/id2label.joblib', 'utf-8'));

// // Function to load the ONNX model and predict
// export async function predict(text: string) {
//     // Load ONNX model
//     const session = await ort.InferenceSession.create('resource/bert_text_classification_model.onnx');

//     // Tokenize input text (you need to apply the same tokenization as during training)
//     const tokenizer = JSON.parse(fs.readFileSync('./tokenizer/tokenizer_config.json', 'utf-8'));

//     const tokens = tokenizer.encode(text);
    
//     // Prepare the inputs
//     const inputIds = new ort.Tensor('int64', new Int32Array(tokens.input_ids), [1, tokens.input_ids.length]);
//     const attentionMask = new ort.Tensor('int64', new Int32Array(tokens.attention_mask), [1, tokens.attention_mask.length]);

//     // Run the model
//     const results = await session.run({ input_ids: inputIds, attention_mask: attentionMask });

//     // Extract the output and decode the prediction
//     const output = results.output.data;
//     const predictedLabelId = output.indexOf(Math.max(...output));
//     const predictedLabel = id2label[predictedLabelId];

//     console.log(`Prediction: ${predictedLabel}`);
// }

// // Example usage:
// const inputText = "im so sad";
// predict(inputText).then(() => {
//     console.log("Prediction done");
// }).catch(err => {
//     console.error("Error predicting: ", err);
// });
