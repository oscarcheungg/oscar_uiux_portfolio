import { CaseStudyHeader, CaseStudyLayout } from '../components/CaseStudy';

const META = [
  { label: 'Role', value: 'Solo Product Designer' },
  { label: 'Timeline', value: '2 months' },
  { label: 'Tools', value: 'Figma, Figjam, UserTesting' },
  { label: 'Responsibilities', value: 'UX Research, Wireframing, Prototyping, Usability Testing' },
];

export function Wigo() {
  return (
    <div
      className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 pt-28 md:pt-36 pb-16 md:pb-24"
      data-accent="blue"
    >
      <CaseStudyLayout>
        <CaseStudyHeader
          eyebrow="WIGO · PRODUCT DESIGN 2026"
          title="Making friend group planning easier"
          subtitle="Wigo provides an all-in-one platform for friend groups to decide on what they want to do and when, turning scattered group chats into simple and shared plans."
          meta={META}
          cover="/wigoCover.png"
          coverAlt="Wigo friend group planning app cover"
        />

        {/* Under construction — case study write-up still in progress */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="text-5xl mb-6" aria-hidden>
            🚧
          </div>
          <h2 className="text-xl md:text-2xl tracking-tight font-normal text-neutral-900 dark:text-neutral-50">
            case study under construction
          </h2>
        </div>
      </CaseStudyLayout>
    </div>
  );
}
