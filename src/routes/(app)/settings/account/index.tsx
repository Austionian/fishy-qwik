import {
  component$,
  type QwikChangeEvent,
  useSignal,
  $,
} from "@builder.io/qwik";
import {
  routeLoader$,
  routeAction$,
  server$,
  zod$,
  z,
  Form,
} from "@builder.io/qwik-city";
import { v4 as uuidv4 } from "uuid";
import { getCookie, getFetchDetails, getUserDetails } from "~/helpers";
import DeleteModal from "~/components/delete-modal";
import type UserDetails from "~/types/UserDetails";
import Alert from "~/components/alert/alert";
import SaveButton from "~/components/save-button/save-button";

export const useUserDetails = routeLoader$<UserDetails>(async ({ cookie }) => {
  return getUserDetails(cookie);
});

export const useUpdateAccount = routeAction$(
  async (accountForm, { cookie, env }) => {
    const TWO_WEEKS_MS = 12096e5;
    const TWO_WEEKS_FROM_TODAY_DATE = new Date(Date.now() + TWO_WEEKS_MS);
    const user_id = cookie.get("user_id")?.value;

    if (!user_id) {
      return {
        error: "No user_id found.",
      };
    }

    const email = accountForm.email;
    const first_name = accountForm.firstName;
    const last_name = accountForm.lastName;

    const { domain, apiKey } = getFetchDetails(env);

    const response = await fetch(`${domain}/v1/user/account`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        user_id,
        email,
        first_name,
        last_name,
      }),
    });

    if (!response.ok) {
      return {
        error: `Error: ${response.statusText}`,
      };
    }

    cookie.set("email", email, {
      path: "/",
      sameSite: "strict",
      expires: TWO_WEEKS_FROM_TODAY_DATE,
    });
    cookie.set("firstName", first_name, {
      path: "/",
      sameSite: "strict",
      expires: TWO_WEEKS_FROM_TODAY_DATE,
    });
    cookie.set("lastName", last_name, {
      path: "/",
      sameSite: "strict",
      expires: TWO_WEEKS_FROM_TODAY_DATE,
    });
  },
  zod$({
    email: z.string().email().nonempty(),
    firstName: z.string(),
    lastName: z.string(),
  })
);

export const serverSaveImageToDB = server$(async function (image_url: string) {
  const { domain, apiKey } = getFetchDetails(this?.env);
  let user_id;
  if (this.cookie) {
    user_id = this?.cookie.get("user_id")?.value;
  } else {
    user_id = getCookie("user_id");
  }

  if (!user_id) return;

  const response = await fetch(`${domain}/v1/user/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      user_id,
      image_url,
    }),
  });

  if (!response.ok) {
    console.error(response.statusText);
    return {
      failed: true,
      error: `Error: ${response.statusText}`,
    };
  }
});

export const serverHandleUpload = server$(async function (name: string) {
  const { apiKey, domain } = getFetchDetails(this.env);
  const res = await fetch(`${domain}/v1/presign_s3`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });
  return await res.json();
});

export default component$(() => {
  const formAction = useUpdateAccount();
  const userDetails = useUserDetails();
  const image = useSignal(userDetails.value.image || "");
  const showDeleteModal = useSignal(false);
  const hideAlert = useSignal(true);
  const saveValue = useSignal("Save");
  const validating = useSignal(false);
  const success = useSignal(true);

  const handleUpload = $(async (e: QwikChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const fileName = `${uuidv4()}-${file.name}`;

      serverHandleUpload(fileName).then((res) => {
        if (file) {
          fetch(res.url, {
            method: "PUT",
            headers: {
              "Content-Type": file.type,
            },
            body: file,
          })
            .then((res) => {
              if (res.status === 200) {
                e.target.blur;
                image.value = `https://mcwfishapp.s3.us-east-2.amazonaws.com/${fileName}`;
                document.cookie = `image=${image.value}; path=/`;
                serverSaveImageToDB(image.value);
              }
            })
            .catch((err) => console.error("err: ", err));
        }
      });
    }
  });

  return (
    <>
      {showDeleteModal.value && (
        <DeleteModal showDeleteModal={showDeleteModal} />
      )}
      <Form
        class="divide-y divide-gray-200 dark:divide-white/10 lg:col-span-9"
        action={formAction}
        onSubmitCompleted$={() => {
          validating.value = false;
          if (formAction.status === 200) {
            saveValue.value = `\u2713`;
          } else {
            success.value = false;
          }
          hideAlert.value = false;
        }}
      >
        {!hideAlert.value ? (
          <Alert
            success={success.value}
            successText={"Successfully updated!"}
            hideAlert={hideAlert}
            failureText={""}
          />
        ) : null}
        <div class="px-4 py-6 sm:p-6 lg:pb-8">
          <div>
            <h2 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
              Account
            </h2>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Update your account information.
            </p>
          </div>

          <div class="mt-6 flex flex-col lg:flex-row">
            <div class="flex-grow space-y-6">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Email
                </label>
                <div class="mt-2 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="email"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                    value={userDetails.value.email}
                  />
                </div>
              </div>

              <div class="col-span-12 sm:col-span-6">
                <label
                  for="firstName"
                  class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  autoComplete="given-name"
                  class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                  value={userDetails.value.firstName}
                />
              </div>

              <div class="col-span-12 sm:col-span-6">
                <label
                  for="lastName"
                  class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="family-name"
                  class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                  value={userDetails.value.lastName}
                />
              </div>
            </div>

            <div class="mt-6 flex-grow lg:ml-6 lg:mt-0 lg:flex-shrink-0 lg:flex-grow-0">
              <p
                class="text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                aria-hidden="true"
              >
                Photo
              </p>
              <div class="mt-2 lg:hidden">
                <div class="flex items-center">
                  <div
                    class="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
                    aria-hidden="true"
                  >
                    {image.value !== "" ? (
                      <img
                        class="h-full w-full rounded-full"
                        src={image.value}
                        alt=""
                      />
                    ) : null}
                    <svg
                      class="h-full w-full text-gray-300 dark:text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div class="relative ml-5">
                    <input
                      id="mobile-user-photo"
                      name="user-photo"
                      type="file"
                      class="peer absolute h-full w-full rounded-md opacity-0 cursor-pointer"
                      onChange$={(e) => {
                        handleUpload(e);
                      }}
                    />
                    <label
                      for="mobile-user-photo"
                      class="pointer-events-none block rounded-md px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 peer-hover:ring-gray-400 peer-focus:ring-2 peer-focus:ring-teal-500"
                    >
                      <span>Change</span>
                      <span class="sr-only"> user photo</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="relative hidden overflow-hidden rounded-full lg:block">
                <span class="inline-block h-40 w-40 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  {image.value !== "" ? (
                    <img
                      class="h-full w-full rounded-full"
                      src={image.value}
                      alt=""
                    />
                  ) : null}
                  <svg
                    class="h-full w-full text-gray-300 dark:text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <label
                  for="desktop-user-photo"
                  class="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
                >
                  <span>Change</span>
                  <span class="sr-only"> user photo</span>
                  <input
                    type="file"
                    id="desktop-user-photo"
                    name="user-photo"
                    class="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0 dark:boder-white/10 dark:text-gray-300"
                    onChange$={(e) => {
                      handleUpload(e);
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-12 gap-6"></div>

          <div class="col-span-12 sm:col-span-6 mt-6"></div>
        </div>

        <div class="divide-y divide-gray-200 pt-6">
          <div class="flex justify-between">
            <div class="mt-4 flex justify-end items-center gap-x-3 px-4 sm:px-6">
              <a
                class="inline-flex justify-center text-red-700 px-3 py-2 font-semibold hover:text-red-600 cursor-pointer"
                onClick$={() => (showDeleteModal.value = true)}
              >
                Delete Account
              </a>
            </div>
            <div class="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6">
              <button
                type="button"
                class="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0 dark:bg-white/5 dark:text-gray-100 dark:hover:bg-white/10 dark:hover:text-white dark:ring-white/10"
              >
                Cancel
              </button>
              <SaveButton saveValue={saveValue} validating={validating} />
            </div>
          </div>
        </div>
      </Form>
    </>
  );
});
