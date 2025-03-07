export default function Footer() {
  return (
    <footer className='bg-muted/50 py-6'>
      <div className='container mx-auto'>
        <p className='text-center text-sm text-muted-foreground'>
          &copy; {new Date().getFullYear()} The Web Architech
        </p>
      </div>
    </footer>
  );
}
