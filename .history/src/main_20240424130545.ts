<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Veuillez choisir votre rôle</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        select, button {
            width: 100%;
            padding: 8px;
            margin-top: 20px;
            border-radius: 4px;
            border: 1px solid #ccc;
        }
        button {
            background-color: #0056b3;
            color: white;
            cursor: pointer;
        }
        button:hover {
            background-color: #004494;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Veuillez choisir votre rôle</h1>
        <select id="roleSelect">
            <option value="generaliste">Médecin généraliste</option>
            <option value="pediatre">Pédiatre</option>
            <option value="cardiologue">Cardiologue</option>
            <option value="dermatologue">Dermatologue</option>
        </select>
        <button onclick="submitRole()">Valider</button>
    </div>
    <script>
        function submitRole() {
            var role = document.getElementById('roleSelect').value;
            alert('Vous avez sélectionné: ' + role);
        }
    </script>
</body>
</html>
