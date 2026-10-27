import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import MenuList from "../components/MenuList";

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favourites, setFavourites] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    let isActive = true;
    async function loadMenu() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("/menu.json");
        if (!response.ok) throw new Error("Could not load menu.json.");
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Menu data has an invalid format.");
        if (isActive) setMenu(data);
      } catch (err) {
        if (isActive) setError(`${err.message} Please check the file in the public folder and refresh.`);
      } finally {
        if (isActive) setLoading(false);
      }
    }
    loadMenu();
    return () => { isActive = false; };
  }, []);

  const categories = ["All", ...new Set(menu.map((item) => item.category))];
  const filteredMenu = useMemo(() => {
    const term = search.trim().toLowerCase();
    return menu.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term);
      const matchesCategory = category === "All" || item.category === category;
      const matchesFavourite = !showFavourites || favourites.includes(item.id);
      return matchesSearch && matchesCategory && matchesFavourite;
    });
  }, [menu, search, category, showFavourites, favourites]);

  function toggleFavourite(id) {
    setFavourites((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    );
  }

  
return (
  <>
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">
          <span className="status-dot" /> SERVING ON CAMPUS TODAY
        </span>

        <h1>
          Your next favourite<br />
          <span>is on the menu.</span>
        </h1>

        <p>
          Fresh bites, student-friendly prices, and a little treat between classes.
        </p>

        <a className="hero-link" href="#today-menu">
          Explore today's menu <span aria-hidden="true">↓</span>
        </a>
      </div>

      <div className="hero-illustration" aria-hidden="true">
        <div className="hero-circle circle-one"></div>
        <div className="hero-circle circle-two"></div>

        <div className="hero-plate">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrpsblDqyUEHGTI25RjoKj7R31Xfe_IsCpzL0vZLCnEw&s=10"
            alt="Burger"
          />
        </div>

        <img
          className="floating-food food-one"
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEhMWFhUXGBcVFxcXGBcVFxcWFxUWFxYVFhcYHSggGBolGxUXITIhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy8lIB8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAPsAyQMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAADBAIFBgcBAAj/xABGEAABAwICBgYGBwcCBgMAAAABAAIRAyEEMQUSQVFhcQYTIoGRoTJCUrHB0QcUFWKS4fAjM0NTcoLxFsJEVJOio7I10uL/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMEAAX/xAAsEQADAAEDBAICAgAHAQAAAAAAAQIRAxIhEzFBUQRhIjKR8CNScYGhwdEU/9oADAMBAAIRAxEAPwDmzQTkEdtAlAMjJetJ3rzHJ7Cv6GWYUDMqFVgCEZ3rzVKG37Du+icDevn0wL6ygaRKUdhHb06lexat+hkPG0qfYSjcCd6YoYI8VzU+wTVejx72qIrNTz8EALpd9Jo2IJoZ7gfXDcvus4Kdtygag3IgPtYlaPoVo8Oe+o4Tqi3NZd+JCtOi+m+pqgH0XZ80XLwK6R1HA0dRpccz5ITq7ieCLTxYc3WFghurscOzJPASogwALc0scPrIgc6o91OmBrsguaSJANxIX1fC12iewETkR+rgbFFujZN7BN4LCV3AOlngjVdH1yfTbyhTaY6aFGYVlPIXUnvsmPs2sREt8FF+hqwEgtPkuwzsoUNKb5JR1QNdCnjsS6lao0N7xdL0cTTeZB7kUwNrOBl1UEWX2qpFjU11bU2TjlwXrQU+zAogwKLtFFIm1u9FZQbmmDhI2qYaIzS7hsAG0m714WM2IgDBmVAYqmCu5O4IuMbF81ztgXr9IMX32ixdivR26fZF4cdiF1Z3IjtIDchP0iNyKVegOp9g6wIVfVeUbEY4FV9SutGnD8mfU1JPXSntE6NfVeNUbUrhKD6hhottXVei2ghRaHuHbiw2Qjq6mxCxO7kc0ToSGg1nE/dyCtsRXbSove1o7DXOgcATCIGSldI05o1APYd7isW/Jdzwcedjq4qmtruFUkuLgYMnO+7grJvS3G7a2sPvMYf9qWxdGJyJ81VvWzCZ5m5o22ivpBe0gV6bSPaZLSOOqTB8l0DAY9lVjalNwc11wfnuK4K9yvujnSWphadVrROtBbOTXXkxy9ynen5RWNZp4Z1vSWmKVButVeGjzPILFaY6ePfLcO3UHtG7jyGxYPFY2pWfrPcXOO07PkEw14aNvNB6Z1azfYtTrVDrVagk7XuunMPTGbXNdHskFZzrQUXDa2uCyQZEEIrTSJZOg6BY2tNN8ioLtIOYVr9iVPb8ggaDwI61hm4Bk77LU6nFRfDNulTc8nB24xwXpxzlGs26UfUhXUplG8DoxpyKFVrJN1U7F8XnanUCughrKBcoAlEDp2JsYFIEr4EorQNqlqBdk7AAvdwUTUcp1SAoyNiKEf8AqDcVGnR1nBo2otQAi2avuiGieufcW2ngNneudbVkCnLwanoNoANaKrh2fVG/iVtBBMJaj2GhrQAAIjgpvrbQCeS866dPJrSwHLVB9MGR3eK8a53sjvKptIdI20paGhzhORtPNFQ32Fq1Pc51pJxDnNdZwJaQd4sQqevvVjpvGPr1nPIhxN4yt8UE6KrEAljoNwYkHwWyeFyea1zwVjnEWCfwOH1muLha3DKVYYXQTngDIiYmxMCSIQq+Ge0Q0GwuB2u8gZLnqy+A7HjLFHOY2wHh8SpUcUB6jT/VJ+KQe68IlMpnImSyxFIGCwQ1wkDPVNwWyc4IPdCLgSQ4TkIJ4KGFMU7m0uPu+ModJ7nOBGWwC6RvjgJtsP0me100QBNtZ1z4ZBN/6kxH8w+Dfks1o/BuMa1lb/UuJ8lNLPc7c0YarWduQHPlHfQM5r76k4q6co3YpirakbF6axTI0c5Efo90QSu3ydssQ11Jp4p5mieKK3Rg2yg9SQrTorV6KhVmzRzAbryvgWbkOpI3ToqXvXnWwmH0AMroD6bVRNMk5aBGqum/R7h415ImG253lcwqYcZhafoxpR1Ko1wuPRdyO3uS6s5ng7TeHydRLbmVNo2oFXES0OaSeOxLPxg2rzmmma0+BrSWP6uk5x2C3M2CwVdpNwrrSWK6yGC4m6V+r2WrRnjLMHya/PHoz31Al08ZJWo0VSbVHYcQaYsPa3ylMRQkQvtCMNKs1xJDdsbQnueCelWLRdVMPSdJeX0ntaTrDgPcqjEgl9zNs7AmNpjamekOOZVfqMLmlo1jlEOtBS2GxTarWxdzBqOHuKw/IVKM+CvyKT4RkekeGDK0gemA7vyPw8V7o/RJeNZ5LW8MzynIcVd9IA0ausASJcD68ezylM6Kwv1gX6ymIzLA1vACblUWvfSnH8kJht4QJmKpspikKTNUX7TQ5xO8k5m6aw2OaSAadPVMA9hrY72iQo1ujwaC41QYBO1I1qZaOxBcNh+Ci4y+M5HpVP7GkZQpgkawz3gnhKN1fA+CwOufWEHbOal9Y4rVupEg9akAgh0Iv1VxMkr5uFhNlHr4ZGlihtCmXzmvhh+AXxpHchwdySYGxmvDWAQKtI7kOnUA9ILtqO3Ba1QG6AXmLptxaRaEpXE5IyChGo+6DXK9rggoestMryZqfggx8ouHqlrgf0Uu5u1F9k8wVUi8mswHSOo1jqYMsF227TZOzeOC8q6cD/RqSdxGqs0TkDyn4ITqBMlT6aY3UaNdojSXVuPW3a4Zi5adh4hWz60y5hDm7xf/AAuespvHrH3qDa9QGz3DiCR7l3T9Mnf5cnQvrQKHiNKUqYdrXdFhBi+1YtukK9pqG+8CfGEfFONyTeElT4YdKOc+h7R+P12V3T2iQByA/NC6Lioa4bT9JxvIkauZJVRouvquvkSAukdAWB1WvULQDAaIGQJJP/qE1yv1fkRpvNEdL4EmBqgwZgiR3eAVDpoYnVLw9+oM2iwbyjYujaQw4hxb3JfR1Nj7OFzmDtBzCktFT2RNW0ck+1KzAQKju8z71odCVhXaDvEHgRmEl0n0F1Naoxl2i7d+qbjnu7lUaNxNTDVNdo1m+s3fxHFP05a+zm2zW4rAh3pDK0jNIfZXEeH5rQ6M0hQxDZa4B21rrOR/s4cPFJsOMo9w9oeKVfWj1wvXNZ7K8quHqtHeFNI9hsAcaB63kpDH7ifBEcGkerPJeUY2uA7k3HoXkIMeeJ7kKrj27WGUX9n7ZJUKr6Y3oJL0c2/Ym/Ez6hS78S4ZBHq127AUrVqA5BXlfRCn9nxxTjm0Ibqh3BfTyXxPJUwieX7I6xXrCQV813JfFyICZuRIt75TzTAgZHeq9tYhOUMQwntHVnw8UGAKcPDhJtvGR5oeIaBYxn5Jl1amD2XCBtJzCRxdVhnVcP1tQRzR9h6RqPAnshWGOpw0ngfJVuj9IMpySCcsuC9x+mddpaGxNpJ2JamnX0PNzM8vkS0c2ajf6gul9C8SGVKjCfTbrDm2fgT4Lmui6zW1GudkDdX50w0Pa+m8CL3EXR1c7lgnCT02mzq7TPglaNiCBcG/zVTovpZQxDR2mtqCxYbGd7ZzClW0/RpQX1Gg7BtPcuZmw+wDpYQ7ENjPUE+JhV2K0PT1Oss2dh2nglK+PZWqOqFzZOUHIDIeCm6prXLgSCNqg7aNcfGz3YA6PpUy0uBsJMbCdvKEpqYb+ZU8HfJXT3BxdMaosL571V9UNx80is17EVdQO9o+C9Y+JBknfCLW0sT/AIQHY9x3eColT8Abn2RJvc+SKKo/QQfrLjZDq1XA38k23Im5DBqN2+5QqFv+UB+IO5QNbgmUCuz6tqnJBZSBXzqs7F4Kh3KiTSJNps+qU4yCg+lF0UuO5fMw7nODWtcXEwGtBJJ3AC5RQGgLWBfELe6J+jPE1AHYhzcO0+qe3U/ADDe89y0+D+jfBM9IVKp3vfqj8NMD3qda8T3Yy06fY42vF3hvQ/BgQ3D4fvaXnxcUhjOitAG2FoExMahaCdwLSov5sLwyi+PT8nFCorqGI6HUngzhtQ3/AHVV3kHy3uVFjehB/g1YOxlZvVk/01BLCecKkfL068iX8a0YqFEhWmN0bVoP1KzHMdEw4Zje05OHESEr9XJ2GFp3Ig4YmUWmQUV2HO7yQzhnDIFHKYu1o91UXDuhwLsvFSw7xqlrhB2SjVcNqnfIkFK34GSJYPCioHavpzbdG2yLTwBBuRa+9P8ARSs1lSHAdppE7pVjitFgBz6ZvmGnLkpuucFFPAtovpFUouALWPAyDmjwkLSf67Z/yrfxfksa7Cw/t2MZeaFqs9rySOJYdzFqrhslReSDEGeS0gwLyO0QmKejm7SeKn1kanosy2o6MneC8FN5MahWmdSg2E8ZU2gbgh1voPR+zOfU6p9QqTdE1vZ8StCLFRq1nIdavAehPspaehnz2oCJ9jkbQrSvWOwJWsTtK5alMHSlEtC9HX4ms2jSguNzua0ZucdgH6zXXNB9HqWAZq4dofVNn1nDtHe1vsN4DvnNL9ANGNw2B6+B1leCZ/lzDGg+Lv7uCtquNqR2Ggcs/NR19Zr8cizGXlLgjiKmqO3nuFyfl3qFNrnZ9kIGFw5IJ9ZXmjqeqfQLyOErLE72Vp7EL4fRoNyXHkCmxotuQLv1wKtDjCI7JH9QIHij67vWYCOF/Jb4+Np9v+mY619T+soKujHD0X9xSGLw4ILKjBcQDEjvC1zqYiRdu7dyQ62Ea4QRO4oX8T/KGfk+zl+ltFDUNNzOupi5pn0mz69B2bTG78lgNNaGdhS14camHqfu37WkZ06oHovHgRcbQO2YvCahuJg7fhuKptMaIpvaRlSrRTqCPQeTFOsBva+O5Q0tSpe2jTWHyjkTQCJUalEmCB2cstqebQDHuY8AFji14nItJDh4ghFqMYSS0ard0krRloGEzPYjCa0270tUw1UN1QdYDLgtGaTTEbt6i2iDkDyTzqtCVpS+TMPrRE2I/VlfYDTkU203C8jtZ2nMrzE6PDhcKrr6KIu0kcCrK5ruQenU9jSuxzaxLQBEOGtE3IslPshvtLP06lWnIvG2Eb7TP30dr8C7l5NpSYZ1UwzDZgn9bk11bs2hpjcfhEpR1cRct9689p5PS3EKmHAlCfSbu8FF9UkmCY3wPBCNSRcuB5gLsM7cEfhzaAUs7CkntQOZuUr1pc4mTA3uJuvX1h3/ANJPmmUsV0HLAOOxM6P0HWxj9SjT1iMybNbzPwT/AEQ6NVMa+SXMot9N+U/dbx47F2bQeGo0WCjQYGtysL8XOK1aWju5Zk1/kbeF3KSjhjTo0qJj9kxlO2UtaGk+IKmKTWgOIkkwL5pzHN1Kz6Z2w5p3g3Pg7W7ncEDGUzqtO1puOCwfI03GpX/BXRvdCH6NZlMDXZnebJyjpGjkCBPAhD6ptamPI7jxRm0wRD2AxtHyzC2ae+f1xjxx/wCGW9r75z55Gg8HbKlSZHL3ITABk53eJ94RWu5+C1p57mdolq35qFJtkQOO5ePcAL2Rwu4MlTpdgN+CocYJoVRt1THPZHfCusQ7rHQ27RmlMJh+sfl2GO13cXAyxnjBPAcV5dy9TV48noTWyOfBzPpnoVzMZWc9mox73va/1XFxkmRtmbKop0GAZyODSefBdoxLGVGuZVaHsdmD7xuPFYPpJ0b+rw4O1qB9FznRquPqu+e1atbSc/kuwmhrqvxfcx9PB3MZZ5AJvqGn0c43/IJxuKo05/aU7cdZeYfStCTNZsDdA2WWbk15Qk7CbdXmRJ96Xfo8G/wEK2dpTBt/ja07BJjmlm6Tw2QLjyafkuzQeGVlXRzbjYcx/hA+yWbh4FXA0rSj0X5x6Dl79qU/5b/wH5o7qFxJRYHSr2uzWkYBXbAIbU37Dwd81iab+0rzB4gtgz8FqqUyE0DxdJ1NxDyZ2jWG33pKpj6YzE948VqMVo6ljKcua01Gg6pO72Sd3uWTq6OY23VAEZyJUsSu5TNPsCfptmQaB3pzQdU4uvToU7FxuY9Fou5x5BJ1A0D92zwHyWv+jmiG06+JIAMiizgI1nx4t8FSJmn2I6lXCzk6Vg6babGYegOy0CY/3Hft5q+pV20W5ge/81z6hpBzfRcROcGEX6yTckk8brYuDzmuS905i+sIe0wW5FQwGmWns1OycuH5clUirKWxdKealq6c2uSunbnsbOjrM7dI2Obc28+CcpaRafSa5p3i48lzOnpSvQPZeRwNx5qww/TR38SkDxaYPnKydDUj9Hx6Zp3zf7I6O3SFP+YO9eu0lTHrjuWGp9K6TvbHNod5ym6en6Ryn8H/AOk2/X7bf7/IrjS9/wB/g09TS4PoNc7ugJOuatT0uy39Zqvp6YByB9yYo4wnKG8s/E3R6Opqfu+AdSI/VFhTw0DVBLQcz6x4AHLmfNOdQAwNYABsHPMneeKzemtIup0X9XPWRA2wTtQejoxT2a5qEbg9sh3nK0xpzHCRC7dd2XdfAOAmJHBIupsqMdQrNDqbxquB3HbzWg0XjdeWuGrUbmM7bHNO0FV+m8KGuD25HPgVUl2OOaa6JChWNHq2arTIeTdzDdpjlbmCvnYOhSZem2ZNwBfitv0/Yeoo4ho7TH9W43s1wJBgZwREfeWANaTEOe03gtIzzzC8zWlzWPB6/wAelcpjVPR1Mu1rCBkAA0iL96Zou1Z1QCIs4bbbUBlVsk6gGyHCSO7ipOxNMtiey6BaAAfGyjyy3B8G13NhrGAxJLjMnfA4If1Sv/Opfg/NT+0G2AF/xf4U/tN3sf8Aam59AwvZzqi+SrdtSYCo8EtT0ewetNR2QMN5/kt1GSOS70RSLG8/kqrpTgocK7S4B/ZcNmsBnHEe4rQ03i25C0vhBVoVGNzglv8AULt8xHeVMq+xzbFVDMAmNy3/AESkaObv62pPl8IXOvrAN5K3/wBHuIFShWoT2muFVo+64Bp82+atHHBk1HlZLminKbUBlIixCcpKpnPa1DWYW7wR4iFXaC0mKofRc4mrROo+RBcBYVI4++eCvGCyo9L6JpUn/XZcx7Bct9cZarhk4Gwv8FwUOYmjOxVlTAjZIT+htL0sU0OZImbHgYI4FPPwo4IYDnBRU8G7eFY4TDO4JxuDKbo4Zdg50EwlLirOlbJL0qUC6LWxLKbdZzm5SAXNaOZJMAIiN5C0qJPWO1DULAXBjY1nkCdVs2k5I/RXSlXEU3ddT6t7CARqubEidWHXkLJM6TN6wuZXa2+rF4JOQmIPctM3H4yAerJBEggSCN4hBPngLTS5RZaSqdXqVci1wHNrjDh8e5F0hiA5scZVH9SxFcjrey3MznyAVnWAAgJhWVfSL/4+vwNMj/qtXL8RWqTLCyAYyLxwXSumVbUwOqAZq1GgAZw3tk5/dHiuZMoVA8wwwb3IHksPyWt56Xw1/h/7ksOKjgNZ42hwMCeNro9ChAjVG6Y1rqbqNUGSWidus0W8Ebr+zqmpTAG6ST/UZus+TUeMpu7txiETqxuHj+SXo1QDap+Gi5x/EbI/Xffq/wDT/JcwZMHofBa5vZozPwHFaQ41jQGtEAZBZ/F48N7DBDRYBI0axLplbmsmRUlwb7B1w5Pz852LM6DrGYMwr1z+Kmyq5OddIcKKWJqsj1i4cnQ4d3ajuRujWmDhK7KwuBZw9ph9IfHuT3TqgdalWAN2mmebbtJ4kE/hWaY13snyV1ysmSlhtH6EbRZWY2rSIc1wBaRtHzQPqxC5r0E6WvwTurrAnDuN7glh9pvDguxUKlOswVGODmOEhwv4qieTPUuSsp0yq/pFo19eg6k1xaTF7HIzBnYtMMMF6MMjgXJz7o10XqYemWvd2p1gRvT2L0o+j++bIHr5eJyVp0ydWpYd7qLXF1hLRJaCYLgBuC5honQFTGOLGOdcy+dYgEXBeDmZtvSt4eCkzuTrJvMH02wzuz1jQeKscR0twzG6xqN9/gsNjPo5xTS3qwH3gkdmJ9Ykn3K2xv0ZvNBgpuBqtu6bBxvbgLo5YHM+yy0p0wb1TqjAXNAnWAkchG1Y2rjamkq9CmGuY8GBrCx1yMwOXddaXRvQfGNpuaQxoc0gtDtaTsOUCysehXQnEUMQK1YgBpBAaSdYiY5C/FI9z8DpRLfICj9G+Lc861Sk1jo1tVvrNMh4+8LX4BdWwWHFKkymDIa0NnfG1fMqL6pVVFKXYlWpVdzys9KNpl7gApmXGG3KznS7pIKDXYbDuBrHs1Hg/uxF2tPt+5C7ULLO09N3WEI9MMWK9QNpvhlIFrYPpGe24RncR/asXisPNQiTIztNjzX1GidZp1o1ha8CRsjehVaw7JJNjuIIn1STmDmvKpuqbZ7USolJDbmBgkjW3ZNnwCJULWg9iTu1jbzRCWluYyHcbZJZgnWJPaz5jKyCGY1UxAbfVbmNgOZjPapdePZHgEi9ki8kRbiLnyTOoPZ8ijgByptQuKt8Dhkpg8KW5i6t8OL2XoUzDpz7LXRtM57OCuWkQlMFShvFMsvdRZoQlpvBddQe0C7e23L0myYHEiR3rnwcuoMqZRnmsN0j0b1dU6oOq+XN5E3bzBtyhND8E9SfKKzWKtOjnSjEYF00nSw+lTddp7thVNcWhfTOxVXBB8ncejfT/CYqGud1NX2Xnsk/dctjT35jeLjxC/LDwrnQ3S7GYX91WcB7LjrN8CqJkK00fpMAL5lJu4LkOjPpheIGIw7XcWGCtLgvpWwDvTFSmeIkI5Qmxm/DVNrQspQ+kHRrv+JaOYj4pg9OtHf82xHKBsr0adsL5zgsdX+kbRrf+I1v6QT7lUYv6WcE391Rq1DxGoPO6G5BWnTOgOfsAlBx+Lp0GdZiaraTB7RueAGZK5NjvpRxtZp6htOg3KQNdw3GTbyKzhq1q9TXqOdVcRcuJJjbqzkNtlK9dLsaNP4rrub3pB9IhqtNLBA06ZsahtVcI9X2B58lmcMSwOBkkjadvPakMNhDfWbG3j5JslxOs0yDmD8IssWpTt8no6enMLCD64cy/qm28STt2ov1cta4CHNcPWA1gBukf4hBAa63J3Lf4IlRpBaQQRGyxiPDwU8j4B4QEREkDMHKMinnURB4Gd03Np5JOlUBBcOxkDsE3zDozR6lVzbRtnsnbfZ3oPudghXcIAOsLDMGx25WQ+td/N9yMzEe1O/aPiia7N4/EPkjnAHJjsNTJVhhcO4OBLYG828FYVsQxg1aYA5Z+O1IOxBcblbM5M2MF7T5qb5i36uq3C4gCxNk0cSBmUuB8k3EA/rNQ0ng+uouaPTb22b5Gbe8ecKAqgi/6yX1PFasX3ROa7BxiTTDhed+73oFTD7pWu0xolrpq0h2vSewettLmjfvG3ZuVJSotcDnPdHijuwI4yVTsNtQnUOK0NPByMj4fqFFuGvZs/rmuWqB6KM4aS+FFaUaNBzBniBA5mVNuDphhksBB3yfDNN1hf8A5zMiiiNocVb1WUWn0mnkXfJQpuo7ZHIE+9d1H6OWjPsr2YZydoUdpb88ijmrSnsteeIaPmExSxjRlSdI+8AB5FJVUysxCC4fC6xENEOgQDnx+KsMOxtI2Gq5pHnYgg581XHS9S37NnMkkjvACnW0jWcLhgG8Bx95M/kpOafcruldi2xLhMh2d4OW+xAspPFgQ3neL57FSl1UgE1rcAy3lZeNoPMjrKh/udcd2WaGz7O6n0W7WSYcCI7jt8V67Ws3WAi/a1RnNpVO3RZcYOu87nEgW3nYp/Ywn0YO4WvxnNc5XsCt+i+pYqk3WDqtEbCDUZPdEpXEYzCj+I0H7ms7zaEvS0I4ns05nZrMAHdMlejozXcYc1jRsOceAKVKPYXVejw6boN9GqTH3H+F2qH+oqXD8Lk0zoa/Y+mZ9ovF+QZ8UT/RNT26X4qn/wBU2dMXNlE+pKnTtfbs4pamUelTMhaSAfrNUT7krUxxmEfGCFVEFzoRSObZZUtIb/JAxmldW88giDDZWS2OwOtkMlywB7sCuB049jw6ZvvVnjMLVc/XpD9m8Co27WwXC4E8dmxVWE0VTd2S4tdvFx4bfFbHRej3NpNaXB5EwW2sYIsbz4pdVqVlB0U6eKKBujsSbF3/AJB7g5TdoCvYk74uXcL+z/jetRqkZAz5qVRjjsP4oWTr0a+hJkzoPVu93Kx+KlS0QBMh0XyE+K09OgDZwIPOQOUlejCgXz4yPnxCPWbB0ZRUUNC0P5l7WgD3zuTtLQlEn0n+LR/tsiPwusTmRkJM8NhXowNQQWkgTIGyN0WS1TfkKlLwHZoWgMxPN5+COdE0G/wmnmXH3lJB9Vl7RntaeV/mvRpE5GdnEDhlxSfn7HxPosm4Cif4NP8AAD7wjDDsi1NnLUEe7ikaePbHpc8/dsTFHEsNw+fD3JMV5DwMNYRk0DhAH68FMscczA3QGylxBNiPCPdkmmNAO/zQOAPwbjJBEcLjvMKvq4K93ax4T8AroUW9+y1x5r3qLE6x8QAmVMBUUKJbeS2NhDvjfYrPRtfrJ1pkcECphdY3nun3jNKMw9RjiWtEcdYR5fqE3DAXxaRe/wAlPU++/wAAqqljnD+FHePi0Iv1up7B/wDGhtYDmYZ2vgrzCtkA5fBVZaNb9cFcYPId69FsySiBaC+D+sl59QA2bVN7RrA8PgEao4wlyPgVqNDRO39ZKvq1dnknsZ8Pgk2sB/XJFCsHhqDZkm/CytMPWg9lKBgnJWWGpi3cubOSGaGMeMzbcU4zEAiBAdylv5LynhWbvenG4ZkeiFKpl9yibRWV69VroNMEbwYnla68pYh5gClP9xv/ANv6lWgEHV2RkhMbY+OZ3woXKkrNNidTFG+tSM7BPnBTFHEsPpAt/tJA7wiNotdmJiI780rjmBoMAWyt8VPgfkZ6qm8nVLXcY+Nrr6tg2ZFlt4MDnYqqebCwFpsADN9oCJUJy1nRa2s6MhslNtyBtocdhGjLLvPxN1FuBaDPpHiTPuVXXx1Rjy1rjAyyPvT2h8Q6pd5k8gNvALnNJdwbkwxwZzs3jrO819ToPF+snkZ5SNquWUgRfdvKHUpgAR8dyVUw8CNKvUEulruYH/sPki09KOOxp5T8AmqVFrgCRt4jZwUxRbuXHZEqulDta6NpBB8iASV43G07S5w/qnzkJpuGYSeyNiHUw7dwyR4ADbjaJtrtPAuAKN1tL2x+NvzXtPBsNiPM/NF+y6Xsn8TvmjwLk//Z"
          alt="Coffee"
        />

        <img
          className="floating-food food-two"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSubT_bubHsHiv2_Ir8YFnybBv8B65fznBX8mxf4V4yhA&s=10"
          alt="Pasta"
        />

        <img
          className="floating-food food-three"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJp2x1ZScfwa2_tyHAGYTM0YNN2PbdzanSh-q84Kly7g&s=10"
          alt="upcake"
        />
      </div>

      <div className="hero-note">
        <span>✦</span>
        <span>Good food.<br />Good mood.</span>
      </div>
    </section>

    <section className="menu-section" id="today-menu">
      <div className="section-heading">
        <div>
          <span className="eyebrow muted-eyebrow">MADE FOR YOUR BREAK</span>
          <h2>
            Today's menu<span className="heading-period">.</span>
          </h2>
        </div>

        {!loading && !error && (
          <span className="result-count">{filteredMenu.length} items</span>
        )}
      </div>

      <div className="menu-tools">
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search the menu..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search menu items"
          />

          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </label>

        <div className="filter-row" aria-label="Filter by category">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              className={`filter-chip ${category === name ? "active" : ""}`}
              onClick={() => setCategory(name)}
              aria-pressed={category === name}
            >
              {name}
            </button>
          ))}

          <button
            type="button"
            className={`filter-chip favourite-filter ${showFavourites ? "active" : ""}`}
            onClick={() => setShowFavourites((value) => !value)}
            aria-pressed={showFavourites}
          >
            ♥ Favourites
          </button>
        </div>
      </div>

      {loading && (
        <div className="message-state">
          <span className="spinner" aria-hidden="true"></span>
          <p>Loading today's menu…</p>
        </div>
      )}

      {error && (
        <div className="error-state" role="alert">
          <strong>Oops! The menu didn't load.</strong>
          <p>{error}</p>
          <button
            className="button button-small"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && (
        <MenuList
          items={filteredMenu}
          onAdd={addToCart}
          favourites={favourites}
          onToggleFavourite={toggleFavourite}
        />
      )}
    </section>

    <footer className="site-footer">
      <span>🥗 Campus Canteen</span>
      <span>Made for the campus community · Menu may change daily</span>
    </footer>
  </>
);

}