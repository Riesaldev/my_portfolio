import { useI18n } from './I18nProvider';
import SafeHTML from './SafeHTML';

/**
 * Componente para mostrar el contenido de bienvenida de la página principal
 * Contiene la información personal y la invitación a explorar el portafolio
 */
export default function WelcomeContent() {
  const { t } = useI18n();
  
  return (
    <div className="text-center md:text-left md:pl-12">
      <h1 className="text-4xl font-bold pb-4">{t('welcome.title')}</h1>
      
      <p className="mt-4 text-lg">
        {t('welcome.description')}
      </p>
      
      <p className="mt-4 text-lg">
        {t('welcome.passion')}
      </p>
      
      <p className="mt-4 text-lg">
        {t('welcome.enjoy')}
      </p>
      
      <SafeHTML
        content={String(t('welcome.portal') || '')}
        type="basic"
        className="mt-4 text-lg"
        tag="p"
      />
    </div>
  );
}
