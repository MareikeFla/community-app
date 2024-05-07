import {
  Card,
  LinkList,
  Paragraph,
  SectionTitle,
  StyledLink,
  Title,
} from "../InfoPages.styled";
import {
  ListItem,
  ListItemLink,
  ListItemMarker,
} from "@/components/EventDetail/EventDetail.styled";

export default function About() {
  return (
    <Card>
      <Title>Über uns</Title>
      <Paragraph>
        Wir sind ein vierköpfiges Team aus erfahrenen und angehenden
        Webentwicklern, die sich während eines intensiven 6-monatigen Web
        Development Bootcamps von{" "}
        <StyledLink href="https://www.neuefische.de" target="_blank">
          neue fische
        </StyledLink>{" "}
        kennengelernt haben. Für das Abschlussprojekt haben wir unsere neu
        erlernten Fähigkeiten vereint, um eine eigene App zu entwickeln.
      </Paragraph>
      <Paragraph>
        Unsere Idee war es, eine Plattform zu schaffen, die es Gleichgesinnten
        ermöglicht zusammenzufinden. Mit unserer Community App wollten wir eine
        einladende Umgebung schaffen, in der Mitglieder Events teilen, entdecken
        und sich austauschen können.
      </Paragraph>
      <Paragraph>
        Wir haben viel Zeit und Mühe in die Entwicklung dieser App gesteckt und
        sind stolz darauf, das Ergebnis unserer harten Arbeit präsentieren zu
        können. Von der Konzeption bis zur Umsetzung haben wir jedes Detail
        sorgfältig durchdacht und waren bestrebt, eine benutzerfreundliche und
        ansprechende Erfahrung zu bieten.
      </Paragraph>
      <SectionTitle>Unser Team besteht aus:</SectionTitle>
      <LinkList>
        <ListItem>
          <ListItemMarker>&raquo;</ListItemMarker>
          <ListItemLink href="https://github.com/n377i" target="blank">
            Annette Wöhler
          </ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemMarker>&raquo;</ListItemMarker>
          <ListItemLink href="https://github.com/Bruno0221" target="blank">
            Bruno Dill
          </ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemMarker>&raquo;</ListItemMarker>
          <ListItemLink href="https://github.com/lea-Mentz" target="blank">
            Lea Mentz
          </ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemMarker>&raquo;</ListItemMarker>
          <ListItemLink href="https://github.com/MareikeFla" target="blank">
            Mareike Flachsenberg
          </ListItemLink>
        </ListItem>
      </LinkList>
    </Card>
  );
}
