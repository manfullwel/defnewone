import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Steps } from '@/components/ui/steps';

interface GoogleSheetsWizardProps {
  onComplete: (token: string) => void;
}

declare global {
  interface Window {
    handleGoogleCallback: (response: any) => void;
  }
}

export const GoogleSheetsWizard = ({ onComplete }: GoogleSheetsWizardProps) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Add Google's OAuth2 script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Handle the OAuth callback
    window.handleGoogleCallback = (response: any) => {
      if (response.access_token) {
        onComplete(response.access_token);
        setOpen(false);
      }
    };
  }, [onComplete]);

  const handleGoogleLogin = () => {
    setLoading(true);

    // Initialize Google's OAuth2 client
    const client = google.accounts.oauth2.initTokenClient({
      client_id: '${process.env.VITE_GOOGLE_CLIENT_ID}',
      scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
      callback: (response: any) => {
        window.handleGoogleCallback(response);
        setLoading(false);
      },
    });

    // Start the OAuth flow
    client.requestAccessToken();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Conectar ao Google Sheets</DialogTitle>
          <DialogDescription className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Para importar dados do Google Sheets, você precisa autorizar o acesso à sua conta
              Google. Seus dados permanecerão seguros e privados.
            </div>

            <div className="flex justify-center">
              <Button onClick={handleGoogleLogin} disabled={loading} size="lg">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Conectando...
                  </>
                ) : (
                  'Conectar com Google'
                )}
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
