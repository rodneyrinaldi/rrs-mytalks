import Image from 'next/image';

export default function BioAdvogado() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6">
      <div className="flex flex-col items-center text-center max-w-sm">
        {/* Foto de Perfil */}
        <div className="relative w-48 h-48 mb-6 overflow-hidden rounded-full border-2 border-gray-100 shadow-sm">
          <Image
            src="/foto-bio.png"
            alt="Foto do Advogado"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Informações */}
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
          Dr. Nome do Advogado
        </h1>
        
        <h2 className="text-lg font-medium text-gold-700 tracking-wide uppercase mb-4">
          Direito Civil & Corporativo
        </h2>

        <p className="text-gray-600 leading-relaxed">
          Especialista em soluções jurídicas estratégicas com mais de 10 anos 
           de experiência na defesa dos interesses de clientes individuais e empresas.
        </p>

        {/* Divisor sutil */}
        <div className="w-16 h-0.5 bg-gray-200 mt-6"></div>
      </div>
    </div>
  );
}