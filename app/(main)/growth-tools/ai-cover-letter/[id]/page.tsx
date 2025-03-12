export default async function SingleCoverLetterPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const { id } = await params;

  return <div>SingleCoverLetterId: {id}</div>;
}
