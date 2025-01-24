# Função para verificar se uma porta está em uso
function Test-PortInUse {
    param($port)
    
    $connection = New-Object System.Net.Sockets.TcpClient
    try {
        $connection.Connect("127.0.0.1", $port)
        $connection.Close()
        return $true
    }
    catch {
        return $false
    }
}

Write-Host "Iniciando o sistema de análise de demandas..." -ForegroundColor Green

# Verificar se Python está instalado
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "Python não encontrado. Por favor, instale o Python 3.8 ou superior." -ForegroundColor Red
    exit 1
}

# Criar e ativar ambiente virtual
if (Test-Path "venv") {
    Write-Host "Ativando ambiente virtual existente..."
} else {
    Write-Host "Criando novo ambiente virtual..."
    python -m venv venv
}

# Ativar ambiente virtual
.\venv\Scripts\Activate

# Instalar dependências Python
Write-Host "Instalando dependências Python..."
pip install -r requirements.txt

# Instalar dependências do frontend
Write-Host "Instalando dependências do frontend..."
Set-Location frontend
npm install
Set-Location ..

# Iniciar backend
Write-Host "Iniciando backend..."
$backendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    .\venv\Scripts\python backend/app.py
}

# Iniciar frontend
Write-Host "Iniciando frontend..."
$frontendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD\frontend
    npm run dev
}

Write-Host "Sistema iniciado! Aguarde alguns segundos..."
Write-Host "Frontend: http://localhost:3001"
Write-Host "Backend: http://localhost:5000"

# Aguardar jobs
Wait-Job $backendJob, $frontendJob
