import { X } from "lucide-react";
import {
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LineIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
  XIcon,
} from "react-share";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function ShareDialog({
  coordinate,
  open,
  onClose,
}: {
  coordinate: { lat: string; lng: string };
  open: boolean;
  onClose: () => void;
}) {
  const shareUrl = `${window.location.href}?lat=${coordinate.lat}&lng=${coordinate.lng}`;

  return (
    <Dialog open={open}>
      <DialogContent className="w-[400px] p-0" close={false}>
        <div>
          <div className="bg-grey-1 px-7 py-5 flex items-center justify-between rounded-tl-sm rounded-tr-sm">
            <Label className="text-base">Bagikan</Label>
            <X className="h-6 w-6 cursor-pointer" onClick={onClose} />
          </div>
          <div className="p-7 flex flex-col gap-5">
            <Label className="text-base text-grey-2">
              Bagikan informasi program ini ke
            </Label>
            <div className="flex gap-2.5">
              <TwitterShareButton url={shareUrl}>
                <XIcon size={40} borderRadius={10} />
              </TwitterShareButton>
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={40} borderRadius={10} />
              </FacebookShareButton>
              <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={40} borderRadius={10} />
              </WhatsappShareButton>
              <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={40} borderRadius={10} />
              </LinkedinShareButton>
              <TelegramShareButton url={shareUrl}>
                <TelegramIcon size={40} borderRadius={10} />
              </TelegramShareButton>
              <LineShareButton url={shareUrl}>
                <LineIcon size={40} borderRadius={10} />
              </LineShareButton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
