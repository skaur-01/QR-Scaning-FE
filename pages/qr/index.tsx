import { decompressFromEncodedURIComponent } from 'lz-string';
import { useRouter } from 'next/router';

type Props = { searchParams: { d?: string } };

export default function QRPage({ searchParams }: Props) {

    const router = useRouter();
    console.log("router",router.query?.d);
    
  const raw = router.query?.d;

  console.log("raw",searchParams);
  
  let data: unknown = null;
  let error: string | null = null;

  if (!raw) {
    error = 'Missing compressed data.';
  } else {
    try {
      const json = decompressFromEncodedURIComponent(raw);
      data = json ? JSON.parse(json) : null;
    } catch {
      error = 'Failed to decompress or parse data.';
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">QR Data (Decompressed)</h1>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}
