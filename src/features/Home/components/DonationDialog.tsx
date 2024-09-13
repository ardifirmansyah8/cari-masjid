import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { usePayment, usePaymentMethods } from "@/hooks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { delimiter } from "@/utils/string";

const PaymentType: { [key: string]: string } = {
  va: "Transfer Bank (Virtual Account)",
  qris: "QRIS",
  retail: "Setor Tunai",
  ewallet: "E-Wallet",
  other: "Lainnya",
};

const DonationSchema = z.object({
  amount: z.string().regex(/^\d+$/),
  phone: z.string().regex(/^[2-9]\d{7,11}$/),
});

type DonationType = z.infer<typeof DonationSchema>;

export default function DonationDialog({
  open,
  onClose,
  id,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
}) {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonationType>({ resolver: zodResolver(DonationSchema) });

  const { mutateAsync: getPaymentMethods } = usePaymentMethods();
  const { mutateAsync } = usePayment();

  const [selectedMethod, setSelectedMethod] = useState("");
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);

  useEffect(() => {
    if (open) {
      getPaymentMethods(0).then((resp) => {
        if (resp.data.paymentFee) {
          const parseMethods = [
            { type: "va", method: [] },
            { type: "qris", method: [] },
            { type: "ewallet", method: [] },
            { type: "retail", method: [] },
            { type: "other", method: [] },
          ] as IPaymentMethod[];
          resp.data.paymentFee.forEach((method: IPaymentFee) => {
            if (method.type === "va") {
              parseMethods[0].method = [...parseMethods[0].method, method];
            } else if (method.type === "qris") {
              parseMethods[1].method = [...parseMethods[1].method, method];
            } else if (method.type === "ewallet") {
              parseMethods[2].method = [...parseMethods[2].method, method];
            } else if (method.type === "retail") {
              parseMethods[3].method = [...parseMethods[3].method, method];
            } else if (method.type === "other") {
              parseMethods[4].method = [...parseMethods[4].method, method];
            }
          });
          setPaymentMethods(parseMethods);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handlePayment = async (data: DonationType) => {
    const body = {
      paymentAmount: Number(data.amount),
      paymentMethod: selectedMethod,
      productDetails: id,
      customerVaName: "Hamba Allah",
      email: "payment@eziswaf.net",
      phoneNumber: "62" + data.phone,
      itemDetails: [
        {
          name: id,
          price: Number(data.amount),
          quantity: 1,
        },
      ],
      customerDetail: {
        firstName: "Hamba Allah",
        lastName: null,
        email: null,
        phoneNumber: "62" + data.phone,
      },
      callbackUrl: "http://lifestyle.eziswaf.net/api/v1/transactions/callback",
      expiryPeriod: 60,
    };

    mutateAsync(body).then((resp) => {
      if (resp.data) {
        window.open(resp.data.paymentUrl, "_self");
      }
    });
  };

  return (
    <Dialog open={open}>
      <DialogContent className="md:w-[600px] p-0" close={false}>
        <ScrollArea className="h-full md:h-[500px] p-7">
          <div className="flex flex-col gap-7 relative">
            <div className="flex items-center justify-between rounded-tl-sm rounded-tr-sm">
              <Label className="text-base text-red-1">Infaq Kotak Amal</Label>
              <X className="h-6 w-6 cursor-pointer" onClick={onClose} />
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-col gap-1">
                <Label htmlFor="amount" className="text-grey-2">
                  Nominal Pembayaran
                </Label>
                <Input
                  id="amount"
                  placeholder="Masukkan nominal atau klik jumlah dibawah ini"
                  {...register("amount")}
                />
                {errors.amount && (
                  <Label className="text-red-500 text-xs">
                    Nominal harus diisi dengan angka
                  </Label>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {[50000, 100000, 150000, 200000].map((value) => (
                  <Button
                    key={value}
                    variant={"outline"}
                    className="text-green-1 font-bold"
                    onClick={() => setValue("amount", value.toString())}
                  >
                    Rp {delimiter(value)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="phone">No Handphone<br/><span className="text-[8px] italic">Untuk menerima Bukti Setor E-ZISWAF</span></Label>
              <Input
                id="phone"
                leftIcon={
                  <div className="absolute top-2.5 left-2 text-grey-4 text-sm">
                    +62
                  </div>
                }
                {...register("phone")}
              />
              {errors.phone && (
                <Label className="text-red-500 text-xs">
                  No handphone tidak valid
                </Label>
              )}
            </div>

            <div>
              <Label className="text-grey-4 font-semibold">
                Metode Pembayaran
              </Label>
              <div className="flex flex-col gap-2.5 mt-5">
                {paymentMethods.map((payment) => (
                  <Accordion
                    key={payment.type}
                    type="single"
                    collapsible
                    className="border border-grey-5 rounded-sm p-2.5"
                  >
                    <AccordionItem value={payment.type}>
                      <AccordionTrigger>
                        {PaymentType[payment.type]}
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-2.5">
                        {payment.method.map((method) => (
                          <div
                            key={method.paymentMethod}
                            className="flex items-center justify-between bg-blue-2 p-2.5 rounded-sm cursor-pointer"
                            onClick={() =>
                              setSelectedMethod(method.paymentMethod)
                            }
                          >
                            <div className="flex items-center gap-2.5">
                              <Image
                                src={method.paymentImage}
                                alt={method.paymentMethod}
                                width={50}
                                height={20}
                              />
                              <Label>{method.paymentName}</Label>
                            </div>
                            {selectedMethod === method.paymentMethod && (
                              <Check className="h-4 w-4 text-green-1 font-bold" />
                            )}
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>

            <div className="bg-green-2 px-5 py-4 flex flex-col gap-1 rounded-[10px]">
              <Label className="text-green-1 text-xs font-medium">
                Niat Infaq
              </Label>
              <Label className="font-semibold leading-5">
                {
                  "Nawaitu taqoruba ilallahi ta'ala, Rabbana taqabbal minna innaka antas sami'ul alim"
                }
              </Label>
            </div>

            <Button
              disabled={!selectedMethod}
              onClick={handleSubmit(handlePayment)}
            >
              Bayar
            </Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
