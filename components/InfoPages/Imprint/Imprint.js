import {
  Card,
  Paragraph,
  SectionTitle,
  StyledLink,
  SubTitle,
  Title,
} from "../InfoPages.styled";

export default function Imprint() {
  return (
    <Card>
      <Title>Impressum</Title>
      <SectionTitle>Pin & Join</SectionTitle>
      <SubTitle>Kontakt</SubTitle>
      <Paragraph>
        <StyledLink href="mailto:pinandjoin@gmail.com">
          pinandjoin@gmail.com
        </StyledLink>
      </Paragraph>
      <SubTitle>Design</SubTitle>
      <Paragraph>Annette Wöhler</Paragraph>
      <SubTitle>Konzeption und Entwicklung</SubTitle>
      <Paragraph>
        Annette Wöhler<br></br>Bruno Dill<br></br>Lea Mentz<br></br>Mareike
        Flachsenberg
      </Paragraph>
      <SectionTitle>Haftungsausschluss</SectionTitle>
      <Paragraph>
        Wir übernehmen keine Verantwortung oder Haftung für die Richtigkeit,
        Vollständigkeit, Rechtmäßigkeit oder Aktualität der von Benutzern
        erstellten Events oder der von externen APIs geladenen Inhalte. Jeder
        Benutzer ist allein verantwortlich für die von ihm erstellten Events,
        einschließlich der bereitgestellten Bilder, Beschreibungen und externen
        Links.
      </Paragraph>
      <Paragraph>
        Wir übernehmen keine Verantwortung für Schäden oder Verluste, die durch
        die Nutzung dieser Inhalte entstehen. Die Nutzung unserer App erfolgt
        auf eigene Gefahr.
      </Paragraph>
      <SectionTitle>Urheberrecht</SectionTitle>
      <Paragraph>
        Die Inhalte und Werke dieser App unterliegen dem deutschen Urheberrecht.
        Die Verwendung, Vervielfältigung oder Weiterverbreitung dieser Inhalte
        ohne ausdrückliche Genehmigung ist untersagt.
      </Paragraph>
      <SectionTitle>Quellenangaben und Nutzungsbedingungen</SectionTitle>
      <SubTitle>Bilder</SubTitle>
      <Paragraph>
        Die für die einzelnen Kategorien verwendeten Bilder stammen von der
        Plattform{" "}
        <StyledLink href="https://www.unsplash.com" target="_blank">
          Unsplash
        </StyledLink>{" "}
        und unterliegen den Nutzungsbedingungen dieser Plattform.
      </Paragraph>
      <SubTitle>Event API</SubTitle>
      <Paragraph>
        Wir beziehen Veranstaltungsinformationen aus der öffentlichen API der
        Stadt Köln, die über{" "}
        <StyledLink
          href="https://www.offenedaten-koeln.de/dataset/oparl-api-koeln"
          target="_blank"
        >
          www.offenedaten-koeln.de
        </StyledLink>{" "}
        bereitgestellt wird. Die Nutzung dieser Daten erfolgt gemäß der{" "}
        <StyledLink
          href="https://www.govdata.de/dl-de/zero-2-0"
          target="_blank"
        >
          Datenlizenz Deutschland – Zero – Version 2.0
        </StyledLink>
        . Laut dieser Lizenz sind die Daten für die kommerzielle und nicht
        kommerzielle Nutzung ohne Einschränkungen oder Bedingungen zulässig.
      </Paragraph>
    </Card>
  );
}
