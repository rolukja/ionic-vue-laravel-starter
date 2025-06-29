#### 🚀 Ionic Vue + Laravel API • Full-Stack Starter Kit


# Ionic Vue Laravel Starter Kit

A modern **Full-Stack Starter Kit** for Cross-Platform Apps that combines:

* 📱 **Ionic Vue** - Cross-Platform Mobile & Web UI with Capacitor
* 🐘 **Laravel API** - RESTful Backend with Sanctum Authentication  
* 🔐 **Token-based Auth** - Secure user authentication with persistent sessions
* 🌐 **Production-Ready** - Configured for Android deployment

---

## 📋 Table of Contents
1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Development](#development)
4. [Android Build](#android-build)
5. [Backend Configuration](#backend-configuration)
6. [Important Notes](#important-notes)
7. [API Endpoints](#api-endpoints)
8. [Troubleshooting](#troubleshooting)

---

## 🔧 Requirements

| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | ≥ 18 LTS | Ionic/Vue Toolchain |
| **npm** | ≥ 9 | Package Management |
| **Ionic CLI** | ≥ 7 | Ionic Commands |
| **Java JDK** | 11+ | Android Build |
| **Android Studio** | Latest | Native Android Development |
| **PHP** | ≥ 8.2 | Laravel Backend |
| **Composer** | Latest | PHP Dependencies |

---

## 🚀 Installation

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd ionic-vue-laravel-starter
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Install Ionic CLI globally (if not already installed)
npm install -g @ionic/cli

# Create environment file
cp .env.example .env
```

### 3. Backend Setup
```bash
cd backend

# Install PHP dependencies
composer install

# Create environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Run database migrations
php artisan migrate

# Optional: Seed data
php artisan db:seed
```

### 4. Configure Environment Variables

**Frontend (.env):**
```env
VITE_API_BASE_URL=https://your-domain.com
```

**Backend (backend/.env):**
```env
APP_URL=https://your-domain.com
SANCTUM_STATEFUL_DOMAINS=capacitor://localhost,ionic://localhost,http://localhost:8100
```

---

## 💻 Development

### Frontend Development Server
```bash
# Hot-reload Development Server
ionic serve
```
App runs on `http://localhost:8100`

### Backend Development Server
```bash
cd backend

# Laravel Development Server
php artisan serve --host=0.0.0.0 --port=8000
```

### Run Both Together
Execute both commands in separate terminals.

---

## 📱 Android Build

### Initial Setup
```bash
# 1. Build app
ionic build

# 2. Add Android platform
npx cap add android

# 3. Sync Capacitor
npx cap sync android
```

### Build Process (for code changes)
```bash
# 1. Rebuild app
ionic build

# 2. Copy changes to Android
npx cap sync android

# 3. Run Android app
npx cap run android
```

### Open Android Studio
```bash
npx cap open android
```

---

## 🖥️ Backend Configuration

### NGINX Configuration
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;
    root /path/to/your/project/backend/public;
    index index.php index.html;
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
    
    location ~ ^/(\.env|\.git|\.svn|\.user\.ini|\.htaccess) { 
        return 404; 
    }
    
    access_log /var/log/nginx/your-domain.access.log;
    error_log  /var/log/nginx/your-domain.error.log;
}

# SSL Configuration (recommended)
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    root /path/to/your/project/backend/public;
    index index.php index.html;
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
    
    location ~ ^/(\.env|\.git|\.svn|\.user\.ini|\.htaccess) { 
        return 404; 
    }
}
```

### CORS Configuration (backend/config/cors.php)
```php
'allowed_origins' => [
    'capacitor://localhost',
    'ionic://localhost', 
    'http://localhost:8100',
    'https://your-domain.com',
    // Add your production URLs here
],
```

---

## ⚠️ Important Notes

### Mixed Content Security
- **Issue**: Capacitor apps run over HTTPS, backend often over HTTP
- **Solution**: Capacitor HTTP Plugin enabled with `allowMixedContent: true`
- Android Network Security Config configured for HTTP connections

### Session Management
- **Token Lifetime**: Unlimited (until manual logout)
- **Storage**: localStorage (`auth_token`, `user`)
- **Auto-Login**: Stored token is validated on app start

### Build Workflow
```bash
# Required for every code change:
ionic build && npx cap sync android && npx cap run android
```

### Capacitor vs. Browser
- **Browser**: Uses Axios for HTTP requests
- **Mobile App**: Uses Capacitor HTTP Plugin for native requests
- Automatic detection in `capacitorRequest()` helper function

---

## 🔌 API Endpoints

| Endpoint | Method | Description | Auth |
|----------|---------|-------------|------|
| `/api/register` | POST | Register user | ❌ |
| `/api/login` | POST | Login user | ❌ |
| `/api/logout` | POST | Logout user | ✅ |
| `/api/user` | GET | Get current user data | ✅ |

### Request/Response Examples

**Login:**
```bash
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  },
  "token": "1|abc123..."
}
```

---

## 🔧 Troubleshooting

### CORS Errors
```
Access-Control-Allow-Origin header contains multiple values
```
**Solution**: Remove all CORS headers from NGINX config, Laravel handles CORS

### Mixed Content Errors
```
Mixed Content: The page was loaded over HTTPS, but requested an insecure HTTP resource
```
**Solution**: Network Security Config is already configured, use `capacitorRequest()`

### Build Errors
```
Cannot resolve module '@capacitor/core'
```
**Solution**: 
```bash
npm install @capacitor/core @capacitor/android
npx cap sync android
```

### Token Issues
```
Unauthenticated
```
**Solution**: 
1. Check if token is stored in localStorage
2. Validate backend URL in `.env`
3. Check CORS configuration

---

## 📁 Project Structure

```
ionic-vue-laravel-starter/
├── src/                    # Ionic Vue Frontend
│   ├── views/              # App Pages (Login, Home, etc.)
│   ├── layouts/            # Layout Components
│   ├── config/             # API Configuration
│   └── router/             # Vue Router Setup
├── backend/                # Laravel API
│   ├── app/                # Laravel App Logic
│   ├── routes/api.php      # API Routes
│   └── config/             # Laravel Configuration
├── android/                # Capacitor Android Project
└── capacitor.config.ts     # Capacitor Configuration
```

---

## 🎯 Features

- ✅ **User Authentication** (Register/Login/Logout)
- ✅ **Token-based API** (Laravel Sanctum)
- ✅ **Responsive Design** (Mobile-First)
- ✅ **Cross-Platform** (Android, iOS, Web)
- ✅ **Production-Ready** (NGINX, CORS, Security)
- ✅ **Auto-Login** (Persistent Sessions)
- ✅ **Native HTTP** (Capacitor Plugin)

---

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please create a Pull Request or open an Issue.

---

**Built with ❤️ for Cross-Platform Mobile Development**