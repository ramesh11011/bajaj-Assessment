
const express = require('express');


const app = express();


const PORT = process.env.PORT || 3000;


app.use(express.json());


app.post('/bfhl', (req, res) => {
    try {
        
        const { data } = req.body;

        
        
        const user_id = "P_Ramesh_27112003"; 
        const email = "programming.ramesh@gmail.com"; 
        const roll_number = "22BCE11020"; 

        
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let all_alphabets_for_concat = [];

     
        data.forEach(item => {
            
            if (!isNaN(item) && !isNaN(parseFloat(item))) {
                const num = parseInt(item, 10);
                sum += num; 
                if (num % 2 === 0) {
                    even_numbers.push(item.toString()); 
                } else {
                    odd_numbers.push(item.toString()); 
                }
            } 
            else if (/^[a-zA-Z]$/.test(item)) {
                alphabets.push(item.toUpperCase()); 
                all_alphabets_for_concat.push(item);
            } 
            
            else {
                special_characters.push(item); 
            }
        });

        
        const reversed_alphabets = all_alphabets_for_concat.reverse();
        let concat_string = "";
        
        reversed_alphabets.forEach((char, index) => {
            if (index % 2 === 0) { 
                concat_string += char.toUpperCase();
            } else { 
                concat_string += char.toLowerCase();
            }
        });


        
        const response = {
            "is_success": true, 
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "odd_numbers": odd_numbers,
            "even_numbers": even_numbers,
            "alphabets": alphabets,
            "special_characters": special_characters,
            "sum": sum.toString(), 
            "concat_string": concat_string
        };

     
        res.status(200).json(response);

    } catch (error) {
      
        res.status(500).json({ 
            "is_success": false, 
            "error": error.message 
        });
    }


});


app.get('/', (req, res) => {
    res.status(200).json({ 
        "operation_code": 1,
        "message": "API is running. Send a POST request to Bajaj Api with your data."
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});