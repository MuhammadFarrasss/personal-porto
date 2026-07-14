export const SCENARIOS = [

    {
        text: "Empty Input Validation",
        result: "PASS"
    },

    {
        text: "Invalid Email",
        result: "PASS"
    },

    {
        text: "Weak Password",
        result: "BUG"
    },

    {
        text: "SQL Injection",
        result: "PASS"
    },

    {
        text: "XSS Payload",
        result: "PASS"
    },

    {
        text: "Emoji Input",
        result: "BUG"
    },

    {
        text: "Unicode",
        result: "PASS"
    },

    {
        text: "Long Username",
        result: "PASS"
    }

];

export const BUG_DATABASE = {

    "Weak Password": {

        id: "BUG-003",

        severity: "Medium",

        expected:
            "Password dengan panjang kurang dari 8 karakter harus ditolak.",

        actual:
            "Sistem tetap mengizinkan password lemah."

    },

    "Emoji Input": {

        id: "BUG-006",

        severity: "Low",

        expected:
            "Emoji harus tervalidasi dengan benar.",

        actual:
            "Karakter emoji menyebabkan format tampilan rusak."

    }

};