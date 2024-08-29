class Episode {
    constructor({ id, name, air_date, episode, characters, url, created }) {
      this.id = id;
      this.name = name;
      this.airDate = air_date;
      this.episodeCode = episode;
      this.characters = characters;
      this.url = url;
      this.created = new Date(created);
    }
}
export default Episode