// Import the Express library to create and manage the server
const express = require('express');

// Create an instance of an Express application
const app = express();

// Define the port the server will run on. Use the environment's port or 3000 as a default.
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Define the POST route for /bfhl as required [cite: 29, 30]
app.post('/bfhl', (req, res) => {
    try {
        // Extract the 'data' array from the request body [cite: 45]
        const { data } = req.body;

        // --- Personal Information ---
        // Replace these with your actual details
        const user_id = "rachit_gupta_06042004"; // [cite: 23]
        const email = "rachitgupta0604@gmail.com"; // [cite: 7]
        const roll_number = "22BSA10213"; // [cite: 8]

        // --- Data Processing Logic ---
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let all_alphabets_for_concat = [];

        // Loop through each item in the input data array
        data.forEach(item => {
            // Check if the item is a number (and not just a string that looks like one)
            if (!isNaN(item) && !isNaN(parseFloat(item))) {
                const num = parseInt(item, 10);
                sum += num; // Add to sum [cite: 13]
                if (num % 2 === 0) {
                    even_numbers.push(item.toString()); // Add to even numbers array as a string [cite: 9, 40]
                } else {
                    odd_numbers.push(item.toString()); // Add to odd numbers array as a string [cite: 10, 40]
                }
            } 
            // Check if the item is an alphabet
            else if (/^[a-zA-Z]$/.test(item)) {
                alphabets.push(item.toUpperCase()); // Convert to uppercase and add to alphabets array [cite: 11]
                all_alphabets_for_concat.push(item);
            } 
            // If it's neither a number nor a single alphabet, consider it a special character
            else {
                special_characters.push(item); // [cite: 12]
            }
        });

        // --- Concatenation Logic --- [cite: 14, 15]
        // Reverse the array of alphabets
        const reversed_alphabets = all_alphabets_for_concat.reverse();
        let concat_string = "";
        // Loop through the reversed alphabets and apply alternating caps
        reversed_alphabets.forEach((char, index) => {
            if (index % 2 === 0) { // Even index (0, 2, 4...) gets uppercase
                concat_string += char.toUpperCase();
            } else { // Odd index (1, 3, 5...) gets lowercase
                concat_string += char.toLowerCase();
            }
        });


        // --- Construct the Response ---
        const response = {
            "is_success": true, // [cite: 26]
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "odd_numbers": odd_numbers,
            "even_numbers": even_numbers,
            "alphabets": alphabets,
            "special_characters": special_characters,
            "sum": sum.toString(), // Return sum as a string [cite: 57]
            "concat_string": concat_string
        };

        // Send the successful response with a 200 status code [cite: 31]
        res.status(200).json(response);

    } catch (error) {
        // Gracefully handle any errors [cite: 27]
        res.status(500).json({ 
            "is_success": false, 
            "error": error.message 
        });
    }


});


app.get('/', (req, res) => {
    res.status(200).json({ 
        "operation_code": 1,
        "message": "API is running. Send a POST request to /bfhl with your data."
    });
});

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});