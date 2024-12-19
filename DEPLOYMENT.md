# Deployment Guide for baantjeboeken.nl

## Domain Setup on Strato

1. Log in to your Strato control panel
2. Go to "Domains & SSL"
3. Select baantjeboeken.nl
4. Update DNS Records:
   ```
   # Point your domain to your server's IP
   A     @     <YOUR_SERVER_IP>
   A     www   <YOUR_SERVER_IP>
   ```

## Server Setup

1. Get a VPS/Server (recommended: Ubuntu 22.04 LTS)
2. SSH into your server:
   ```bash
   ssh root@<YOUR_SERVER_IP>
   ```

3. Install required software:
   ```bash
   apt update
   apt install nginx python3 python3-pip nodejs npm
   ```

4. Set up SSL (recommended):
   ```bash
   apt install certbot python3-certbot-nginx
   certbot --nginx -d baantjeboeken.nl -d www.baantjeboeken.nl
   ```

5. Deploy the application:
   ```bash
   # Create directory
   mkdir -p /var/www/baantjeboeken.nl

   # Copy frontend files
   cp -r /path/to/your/frontend/* /var/www/baantjeboeken.nl/

   # Set up backend
   mkdir -p /opt/baantjeboeken
   cp -r /path/to/your/backend/* /opt/baantjeboeken/
   cd /opt/baantjeboeken
   pip3 install -r requirements.txt

   # Set up systemd service for backend
   nano /etc/systemd/system/baantjeboeken.service
   ```

6. Create systemd service:
   ```ini
   [Unit]
   Description=Baantjeboeken Backend
   After=network.target

   [Service]
   User=www-data
   WorkingDirectory=/opt/baantjeboeken
   ExecStart=/usr/bin/python3 main.py
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

7. Start services:
   ```bash
   systemctl daemon-reload
   systemctl enable baantjeboeken
   systemctl start baantjeboeken
   systemctl restart nginx
   ```

## Maintenance

- Monitor logs:
  ```bash
  journalctl -u baantjeboeken
  tail -f /var/log/nginx/error.log
  ```

- Update application:
  ```bash
  # Frontend
  cd /var/www/baantjeboeken.nl
  # Copy new files and then:
  nginx -t && systemctl restart nginx

  # Backend
  cd /opt/baantjeboeken
  # Copy new files and then:
  systemctl restart baantjeboeken
  ```

## Security Recommendations

1. Set up UFW firewall:
   ```bash
   ufw allow ssh
   ufw allow http
   ufw allow https
   ufw enable
   ```

2. Regular updates:
   ```bash
   apt update && apt upgrade
   ```

3. Set up automated backups
4. Monitor server resources
5. Implement rate limiting in nginx
6. Keep SSL certificates up to date

## Troubleshooting

1. Check if services are running:
   ```bash
   systemctl status baantjeboeken
   systemctl status nginx
   ```

2. Check logs:
   ```bash
   journalctl -u baantjeboeken -n 100
   tail -f /var/log/nginx/error.log
   ```

3. Test nginx configuration:
   ```bash
   nginx -t
   ```

4. SSL issues:
   ```bash
   certbot renew --dry-run
   ```
