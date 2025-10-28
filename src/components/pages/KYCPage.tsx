import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Upload, CheckCircle2, Camera, FileText } from "lucide-react";
import { Progress } from "../ui/progress";

interface KYCPageProps {
  onComplete: () => void;
}

export function KYCPage({ onComplete }: KYCPageProps) {
  const [step, setStep] = useState<"upload" | "processing" | "success">("upload");
  const [idUploaded, setIdUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);

  const handleVerify = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
    }, 2000);
  };

  const handleComplete = () => {
    onComplete();
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00B050]/10 via-background to-[#74DCBA]/10 dark:from-[#00B050]/20 dark:via-background dark:to-[#74DCBA]/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl text-center">
          <CardContent className="pt-12 pb-8">
            <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-primary mb-2">Verification Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Your identity has been verified. You can now access your agent wallet.
            </p>
            <Button
              className="bg-primary hover:bg-primary-hover"
              onClick={handleComplete}
            >
              Continue to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "processing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00B050]/10 via-background to-[#74DCBA]/10 dark:from-[#00B050]/20 dark:via-background dark:to-[#74DCBA]/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="pt-12 pb-8">
            <h3 className="text-center mb-4">Verifying your documents...</h3>
            <Progress value={66} className="mb-4" />
            <p className="text-center text-muted-foreground text-sm">
              This may take a few moments
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00B050]/10 via-background to-[#74DCBA]/10 dark:from-[#00B050]/20 dark:via-background dark:to-[#74DCBA]/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-primary">KYC Verification</CardTitle>
          <CardDescription>
            Upload your documents to verify your identity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <label className="block">
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  idUploaded
                    ? "border-primary bg-primary/10 dark:bg-primary/20"
                    : "border-border hover:border-primary"
                }`}
              >
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={() => setIdUploaded(true)}
                />
                {idUploaded ? (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>ID Document Uploaded</span>
                  </div>
                ) : (
                  <>
                    <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                    <p>Upload ID Document</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      National ID, Passport, or Driver's License
                    </p>
                  </>
                )}
              </div>
            </label>

            <label className="block">
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  selfieUploaded
                    ? "border-primary bg-primary/10 dark:bg-primary/20"
                    : "border-border hover:border-primary"
                }`}
              >
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={() => setSelfieUploaded(true)}
                />
                {selfieUploaded ? (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Selfie Uploaded</span>
                  </div>
                ) : (
                  <>
                    <Camera className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                    <p>Upload Selfie</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Take a clear photo of your face
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>

          <Button
            className="w-full bg-primary hover:bg-primary-hover"
            disabled={!idUploaded || !selfieUploaded}
            onClick={handleVerify}
          >
            <Upload className="w-4 h-4 mr-2" />
            Verify Documents
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Your documents are encrypted and stored securely
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
