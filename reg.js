function countDeclarations(code) {
    const variablePattern = /(let|const)\s+(\w+)\s*=\s*([^;\n]+)/g;
    const functionPattern = /function\s+(\w+)\s*\(([^)]*)\)/g;

    let variables = {};
    let functions = [];

    let match;
    while ((match = variablePattern.exec(code))) {
      const variableName = match[2];
      const variableValue = match[3].trim();
      variables[variableName] = variableValue;
    }

    while ((match = functionPattern.exec(code))) {
      const functionName = match[1];
      const functionParams = match[2].split(',').map((p) => p.trim());
      functions.push({ name: functionName, params: functionParams });
    }

    return { variables, functions };
  }

  const fileInput = document.getElementById('fileInput');
  const functionButton = document.getElementById('functionButton');
  const variableButton = document.getElementById('variableButton');
  const output = document.getElementById('output');

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {
      const code = event.target.result;

      functionButton.addEventListener('click', () => {
        const { functions } = countDeclarations(code);
        let functionHTML = '<p>Functions:</p><ul>';
        for (let i = 0; i < functions.length; i++) {
          functionHTML += `<li>${functions[i].name}(${functions[i].params})</li>`;
        }
        functionHTML += '</ul>';
        output.innerHTML = functionHTML;
      });

      variableButton.addEventListener('click', () => {
        const { variables } = countDeclarations(code);
        let variableHTML = '<p>Variables:</p><ul>';
        for (let variableName in variables) {
          variableHTML += `<li>${variableName}: ${variables[variableName]}</li>`;
        }
        variableHTML += '</ul>';
        output.innerHTML = variableHTML;
      });
    };
  });
  