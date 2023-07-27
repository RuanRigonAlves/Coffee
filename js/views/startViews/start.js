export default function startPage() {}

export function displayStartPage(section) {
  section.classList = "main-section";

  section.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="start">
    <h1>Lorem</h1>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
      consequuntur illo natus. Libero voluptas sapiente, dolore, deserunt
      itaque atque placeat expedita esse corrupti dignissimos veniam
      similique aperiam blanditiis vitae harum?
    </p>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos
      at unde et nesciunt ipsam corporis aut odit consectetur necessitatibus
      esse, error ab optio non! Animi aspernatur error voluptas eveniet
      voluptatibus? Placeat alias, accusantium corrupti eos velit id dolorem
      quae obcaecati exercitationem delectus et repudiandae deleniti aut,
      aliquam minima voluptates? Eligendi non pariatur, doloremque earum
      accusamus ipsa necessitatibus maxime delectus illum! Libero laudantium
      laborum natus voluptate. Quaerat incidunt reprehenderit reiciendis
      maxime, quos impedit inventore dolore culpa cupiditate assumenda sequi
      neque ratione. Blanditiis omnis iste in quibusdam aliquid sint.
      Asperiores, porro illo.
    </p>
  </div>
    `
  );
}
