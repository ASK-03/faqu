import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  params: {
    userId: string;
  };
};

export default function Page({ params }: Props) {
  return (
    <main className="w-full bg-secondary-background text-primary">
      <Card className="w-full h-[800px] overflow-scroll">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Card>
            <CardHeader>Toggle Mode</CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <button className="btn btn-primary">Toggle</button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </main>
  );
}
