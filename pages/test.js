import { wrapper } from "../store";
import React, { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Test({ dataSet, initialUrl }) {
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [gridData, setGridData] = useState(dataSet.results);
  const [url, setUrl] = useState("https://api.themoviedb.org/3/discover/movie?api_key=adce0ce3d9660099f2ec8345438ceeb4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false");

  const { data, error } = useSWR(`${url}&page=${pageIndex}`, fetcher, {
    fallbackData: url === initialUrl ? dataSet : null,
  });

  function changeUrl() {
    const newUrl =
      "https://api.themoviedb.org/3/discover/movie?api_key=adce0ce3d9660099f2ec8345438ceeb4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&primary_release_year=1960";

    if (url !== newUrl) {
      setLoading(true);
      setPageIndex(1);
      setUrl(newUrl);
    } else {
      console.log("same");
    }
  }

  function changePage(num) {
    setLoading(true);
    setPageIndex(num);
  }

  function setData(datas) {
    return datas.map((d) => {
      return {
        ...d,
        original_title: d.original_title + " new",
      };
    });
  }

  useEffect(() => {
    if (data !== null) {
      setGridData(setData(data.results));
    } else {
      setGridData([]);
    }
  }, [data]);

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 3000);
  }, [gridData]);

  if (error) return "An error has occurred.";
  if (!gridData || loading) return "Loading...";

  return (
    <div>
      {gridData.map((item) => (
        <div key={item.id}>{item.original_title}</div>
      ))}
      <div>
        <button onClick={() => changePage(pageIndex - 1)}>Previous</button>
        <button onClick={() => changePage(pageIndex + 1)}>Next</button>
        <button onClick={() => changeUrl()}>New URL</button>
      </div>
    </div>
  );
}

const dummy = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: "/5A9dsIpb7876nU9QrWEGziDmj0r.jpg",
      genre_ids: [27, 18, 53],
      id: 539,
      original_language: "en",
      original_title: "Psycho",
      overview:
        "When larcenous real estate clerk Marion Crane goes on the lam with a wad of cash and hopes of starting a new life, she ends up at the notorious Bates Motel, where manager Norman Bates cares for his housebound mother.",
      popularity: 42.18,
      poster_path: "/nXjkXxpsE7ZGRCVd6PKkrf9tgsL.jpg",
      release_date: "1960-06-22",
      title: "Psycho",
      video: false,
      vote_average: 8.4,
      vote_count: 7672,
    },
    {
      adult: false,
      backdrop_path: "/kJaisj9uNIzjHum6XM9HD9yI8vu.jpg",
      genre_ids: [36, 10752, 18, 12],
      id: 967,
      original_language: "en",
      original_title: "Spartacus",
      overview:
        "The rebellious Thracian Spartacus, born and raised a slave, is sold to Gladiator trainer Batiatus. After weeks of being trained to kill for the arena, Spartacus turns on his owners and leads the other slaves in rebellion. As the rebels move from town to town, their numbers swell as escaped slaves join their ranks. Under the leadership of Spartacus, they make their way to southern Italy, where they will cross the sea and return to their homes.",
      popularity: 25.24,
      poster_path: "/prdCmV8GkDLpguwoxBQczFAwvci.jpg",
      release_date: "1960-10-13",
      title: "Spartacus",
      video: false,
      vote_average: 7.6,
      vote_count: 1533,
    },
    {
      adult: false,
      backdrop_path: "/ruMcEBj1IpwdzXbeG7WAzjygAPN.jpg",
      genre_ids: [27],
      id: 29756,
      original_language: "en",
      original_title: "13 Ghosts",
      overview:
        "Reclusive Dr. Zorba has died and left his mansion to his nephew Cyrus and his family. They will need to search the house to find the doctor's fortune, but along with the property they have also inherited the occultist's collection of 13 ghosts.",
      popularity: 16.768,
      poster_path: "/9mbaqetOehhqdf9hl6H1LTISMbC.jpg",
      release_date: "1960-07-18",
      title: "13 Ghosts",
      video: false,
      vote_average: 5.8,
      vote_count: 90,
    },
    {
      adult: false,
      backdrop_path: "/2aC3284N1p86o6S4Uyj9AaryYeR.jpg",
      genre_ids: [37],
      id: 966,
      original_language: "en",
      original_title: "The Magnificent Seven",
      overview: "An oppressed Mexican peasant village hires seven gunfighters to help defend their homes.",
      popularity: 16.007,
      poster_path: "/rRgCImx3MCrxHVAksuJM938xTbC.jpg",
      release_date: "1960-04-14",
      title: "The Magnificent Seven",
      video: false,
      vote_average: 7.6,
      vote_count: 1282,
    },
    {
      adult: false,
      backdrop_path: "/bCrlhcXK5oTyXRvT9JXGysRrt3Q.jpg",
      genre_ids: [35, 18, 10749],
      id: 284,
      original_language: "en",
      original_title: "The Apartment",
      overview:
        "Bud Baxter is a minor clerk in a huge New York insurance company, until he discovers a quick way to climb the corporate ladder. He lends out his apartment to the executives as a place to take their mistresses. Although he often has to deal with the aftermath of their visits, one night he's left with a major problem to solve.",
      popularity: 14.741,
      poster_path: "/rwYVl3kjD70nAyhlYXjl27bwFRx.jpg",
      release_date: "1960-06-21",
      title: "The Apartment",
      video: false,
      vote_average: 8.2,
      vote_count: 1574,
    },
    {
      adult: false,
      backdrop_path: "/zPbu0CFnAT2kYfbGWjgZBTajmzi.jpg",
      genre_ids: [35, 18],
      id: 439,
      original_language: "it",
      original_title: "La dolce vita",
      overview:
        "Journalist and man-about-town Marcello struggles to find his place in the world, torn between the allure of Rome's elite social scene and the stifling domesticity offered by his girlfriend, all the while searching for a way to become a serious writer.",
      popularity: 13.53,
      poster_path: "/5Zq9pAs3Y9TrFHxO0nEbq3QVTtj.jpg",
      release_date: "1960-02-05",
      title: "La Dolce Vita",
      video: false,
      vote_average: 8.2,
      vote_count: 1323,
    },
    {
      adult: false,
      backdrop_path: "/4svggv4gfe6vHsrGpaRMzrXLozt.jpg",
      genre_ids: [80, 35, 10402, 53],
      id: 299,
      original_language: "en",
      original_title: "Ocean's Eleven",
      overview: "Danny Ocean and his gang attempt to rob the five biggest casinos in Las Vegas in one night.",
      popularity: 10.675,
      poster_path: "/A4R6u7SidBPVXMVzGSysCiRGTRz.jpg",
      release_date: "1960-08-10",
      title: "Ocean's Eleven",
      video: false,
      vote_average: 6.5,
      vote_count: 225,
    },
    {
      adult: false,
      backdrop_path: "/fnf169M0zO9Hx8BtHY1nRsEJ8oy.jpg",
      genre_ids: [27, 53, 18],
      id: 11167,
      original_language: "en",
      original_title: "Peeping Tom",
      overview:
        "Loner Mark Lewis works at a film studio during the day and, at night, takes racy photographs of women. Also he's making a documentary on fear, which involves recording the reactions of victims as he murders them. He befriends Helen, the daughter of the family living in the apartment below his, and he tells her vaguely about the movie he is making.",
      popularity: 10.636,
      poster_path: "/rrjg1LQ0C6yBfdguQuTPTWuSP6.jpg",
      release_date: "1960-05-16",
      title: "Peeping Tom",
      video: false,
      vote_average: 7.5,
      vote_count: 500,
    },
    {
      adult: false,
      backdrop_path: "/5VGmkeXybclhOqBaLprigVG9Ucz.jpg",
      genre_ids: [18, 80],
      id: 269,
      original_language: "fr",
      original_title: "À bout de souffle",
      overview: "A small-time thief steals a car and impulsively murders a motorcycle policeman. Wanted by the authorities, he attempts to persuade a girl to run away to Italy with him.",
      popularity: 10.587,
      poster_path: "/9Wx0Wdn2EOqeCZU4SP6tlS3LOml.jpg",
      release_date: "1960-03-16",
      title: "Breathless",
      video: false,
      vote_average: 7.7,
      vote_count: 1238,
    },
    {
      adult: false,
      backdrop_path: "/dcgLMVGlA1Pf3yjGwohXpuvH9yr.jpg",
      genre_ids: [12, 10751],
      id: 18444,
      original_language: "en",
      original_title: "Swiss Family Robinson",
      overview:
        "After being shipwrecked, the Robinson family is marooned on an island inhabited only by an impressive array of wildlife. In true pioneer spirit, they quickly make themselves at home but soon face a danger even greater than nature: dastardly pirates. A rousing adventure suitable for the whole family, this Disney adaptation of the classic Johann Wyss novel stars Dorothy McGuire and John Mills as Mother and Father Robinson.",
      popularity: 10.54,
      poster_path: "/m63h1fA9b0F77uuRhI3nCH507EJ.jpg",
      release_date: "1960-12-21",
      title: "Swiss Family Robinson",
      video: false,
      vote_average: 7,
      vote_count: 231,
    },
    {
      adult: false,
      backdrop_path: "/bUA6Fu0C2jGqrjn0A9AJwTRpq41.jpg",
      genre_ids: [53, 12, 14, 878, 10749],
      id: 2134,
      original_language: "en",
      original_title: "The Time Machine",
      overview: "A Victorian Englishman travels to the far future and finds that humanity has divided into two hostile species.",
      popularity: 10.446,
      poster_path: "/x3BOzx2rUc5c3gG9UCelzSxv8n4.jpg",
      release_date: "1960-05-25",
      title: "The Time Machine",
      video: false,
      vote_average: 7.4,
      vote_count: 559,
    },
    {
      adult: false,
      backdrop_path: "/vD26dt9ATOulvjej923GfxAjGre.jpg",
      genre_ids: [27, 878],
      id: 11773,
      original_language: "en",
      original_title: "Village of the Damned",
      overview:
        "In a small English village everyone suddenly falls unconscious. When they awake every woman of child bearing age is pregnant. The resulting children have the same strange blond hair, eyes and a strong connection to each other.",
      popularity: 10.402,
      poster_path: "/qcpXud1UjQzlSe9A062w8Wqgira.jpg",
      release_date: "1960-06-16",
      title: "Village of the Damned",
      video: false,
      vote_average: 7.3,
      vote_count: 271,
    },
    {
      adult: false,
      backdrop_path: "/6SKhqqAPrJyPz9Cx1N1jaOBqV0a.jpg",
      genre_ids: [18, 14, 9648],
      id: 122019,
      original_language: "es",
      original_title: "Macario",
      overview:
        "Poor, hungry peasant Macario longs for just one good meal on the Day of the Dead. After his wife cooks a turkey for him, he meets three apparitions, the Devil, God, and Death. Each asks him to share his turkey, but he refuses all except Death. In return, Death gives him a bottle of water which will heal any illness. Soon, Macario is more wealthy than the village doctor, which draws the attention of the feared Inquisition.",
      popularity: 9.255,
      poster_path: "/xX9JGtsnXQAR7e1fWkr7zBuQUHN.jpg",
      release_date: "1960-05-09",
      title: "Macario",
      video: false,
      vote_average: 8.6,
      vote_count: 92,
    },
    {
      adult: false,
      backdrop_path: "/6EMJitcQFS2794HoxVOe0YESUvz.jpg",
      genre_ids: [80, 18],
      id: 42506,
      original_language: "ko",
      original_title: "하녀",
      overview: "A piano composer's family moves into a new house; when his pregnant wife collapses from working to support the family, he hires a hot housemaid to help with housework.",
      popularity: 9.079,
      poster_path: "/xQUKUufYdLjPqTnWRHuUTHsN5On.jpg",
      release_date: "1960-11-03",
      title: "The Housemaid",
      video: false,
      vote_average: 7.2,
      vote_count: 89,
    },
    {
      adult: false,
      backdrop_path: "/vFno98QhEkyFcpdVI74kAdSa0ja.jpg",
      genre_ids: [10749, 37],
      id: 6643,
      original_language: "en",
      original_title: "The Unforgiven",
      overview: "The neighbors of a frontier family turn on them when it is suspected that their adopted daughter was stolen from the local Kiawa tribe.",
      popularity: 8.936,
      poster_path: "/2slbC1Ey2FJnTytxNx842sah0vU.jpg",
      release_date: "1960-01-01",
      title: "The Unforgiven",
      video: false,
      vote_average: 6.4,
      vote_count: 113,
    },
    {
      adult: false,
      backdrop_path: "/3TcUsPiVU0fSLX0Mk7lc3DDuzkY.jpg",
      genre_ids: [18, 10752],
      id: 24167,
      original_language: "it",
      original_title: "La ciociara",
      overview:
        "Widowed shopkeeper Cesira and her 13-year-old daughter Rosetta flee from the allied bombs in Rome during the second World War; they travel to the remote village where Cesira was born. During their journey and in the village and onward, the mother does everything she can to protect Rosetta. Meanwhile, a sensitive young intellectual, Michele, falls in love with Cesira.",
      popularity: 8.856,
      poster_path: "/biWDAUQD58enMEcyO2BqIVSycF4.jpg",
      release_date: "1960-12-22",
      title: "Two Women",
      video: false,
      vote_average: 7.9,
      vote_count: 375,
    },
    {
      adult: false,
      backdrop_path: "/oc7FZ5DFRYa7wMm1q20yqljmSsm.jpg",
      genre_ids: [80, 18],
      id: 8422,
      original_language: "it",
      original_title: "Rocco e i suoi fratelli",
      overview: "When a widow’s family moves to the big city, two of her sons become romantic rivals with deadly results.",
      popularity: 8.479,
      poster_path: "/4W350DliZcbhcb7oiDTYo0hsTg9.jpg",
      release_date: "1960-10-06",
      title: "Rocco and His Brothers",
      video: false,
      vote_average: 8.1,
      vote_count: 362,
    },
    {
      adult: false,
      backdrop_path: "/wy4qzLQ72xBHqzSeEuTDT8iGFb9.jpg",
      genre_ids: [35, 10749],
      id: 25767,
      original_language: "en",
      original_title: "The Grass Is Greener",
      overview:
        "Victor and Hillary are down on their luck to the point that they allow tourists to take guided tours of their castle. But Charles Delacro, a millionaire oil tycoon, visits, and takes a liking to more than the house. Soon, Hattie Durant gets involved and they have a good old fashioned love triangle.",
      popularity: 8.473,
      poster_path: "/wvpLCF7zXestnl22aOhXRyDJBZU.jpg",
      release_date: "1960-12-23",
      title: "The Grass Is Greener",
      video: false,
      vote_average: 6.4,
      vote_count: 82,
    },
    {
      adult: false,
      backdrop_path: "/9hdHLj5aJ0kQpPnCC2lFHsu9K7K.jpg",
      genre_ids: [27],
      id: 23220,
      original_language: "en",
      original_title: "The Brides of Dracula",
      overview:
        "A young teacher on her way to a position in Transylvania helps a young man escape the shackles his mother has put on him. In so doing she innocently unleashes the horrors of the undead once again on the populace, including those at her school for ladies. Luckily for some, Dr. Van Helsing is already on his way.",
      popularity: 8.255,
      poster_path: "/8i0WWZwBh1eQB2KJSSQdYmS2q3C.jpg",
      release_date: "1960-07-07",
      title: "The Brides of Dracula",
      video: false,
      vote_average: 6.8,
      vote_count: 133,
    },
    {
      adult: false,
      backdrop_path: "/wKzY5EGRweXc91eBs1jk9ZSXcp0.jpg",
      genre_ids: [27],
      id: 27632,
      original_language: "it",
      original_title: "La maschera del demonio",
      overview:
        "A vengeful witch and her fiendish servant return from the grave and begin a bloody campaign to possess the body of the witch's beautiful look-alike descendant. Only the girl's brother and a handsome doctor stand in her way.",
      popularity: 8.202,
      poster_path: "/wpwETIDNFZQrWYvPjAqv8xOaHtK.jpg",
      release_date: "1960-08-12",
      title: "Black Sunday",
      video: false,
      vote_average: 7.5,
      vote_count: 319,
    },
  ],
  total_pages: 117,
  total_results: 2321,
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  return {
    props: {
      initialUrl: "https://api.themoviedb.org/3/discover/movie?api_key=adce0ce3d9660099f2ec8345438ceeb4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false",
      dataSet: dummy,
    },
  };
});
