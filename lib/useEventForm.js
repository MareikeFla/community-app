import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getFormattedTodaysDate } from "./dateHelpers";
import { useSession } from "next-auth/react";
import { upload } from "@/lib/upload";
import { turnAddressToEditIntoString } from "./stringHelpers";
import deleteImageFromCloudinary from "./cloudinary/deleteImageFromCloudinary";
import deleteImageKeyFromDB from "./cloudinary/deleteImageKeyFromDB";

export function useEventForm(editEvent, categories) {
  const { data: session } = useSession();
  const userID = session?.user.id;
  const router = useRouter();

  // Handle category selection

  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  useEffect(() => {
    if (editEvent) {
      setSelectedCategory(editEvent.category._id);
      setSelectedSubCategories(editEvent.subCategories || []);
      loadSubCategories(editEvent.category._id);
    }
  }, [editEvent]);

  const loadSubCategories = (categoryId) => {
    if (categoryId) {
      const mainCategory = categories.find((cat) => cat._id === categoryId);
      if (mainCategory?.subCategories) {
        setSubCategories(mainCategory.subCategories);
      }
    }
  };

  // Load subcategories for default category
  useEffect(() => {
    const defaultCategory = categories[0]?._id;
    if (defaultCategory) {
      loadSubCategories(defaultCategory);
    }
  }, []);

  // Load subcategories on initialization and when selectedCategory changes
  useEffect(() => {
    loadSubCategories(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    const selectedCategoryID = event.target.value;
    setSelectedCategory(selectedCategoryID);
    setSelectedSubCategories([]);
    loadSubCategories(selectedCategoryID);
  };

  // Handle sub category tag selection

  const handleSubCategoryTagClick = (subCategoryId) => {
    setSelectedSubCategories((prev) => {
      const updatedSubCategories = prev.includes(subCategoryId)
        ? prev.filter((id) => id !== subCategoryId)
        : [...prev, subCategoryId];

      return updatedSubCategories;
    });
  };

  // Handle costs switch relation with costs input field

  const [isFreeOfCharge, setIsFreeOfCharge] = useState(
    editEvent ? editEvent.costs === "Kostenlos" : true
  );

  const initialCosts = editEvent ? editEvent.costs : "";
  const [costs, setCosts] = useState(initialCosts);

  function handleCostsChange(event) {
    setCosts(event.target.value);
  }

  // Handle start dates relation to end date and vice versa

  const [startDate, setStartDate] = useState(
    editEvent?.start?.date || getFormattedTodaysDate()
  );
  const [endDate, setEndDate] = useState(editEvent?.end?.date || startDate);

  function handleStartDateChange(event) {
    const startDate = event.target.value;
    startDate > endDate && setEndDate(startDate);
    setStartDate(startDate);
  }

  function handleEndDateChange(event) {
    setEndDate(event.target.value);
  }

  // Handle counter for characters at short description

  const MAX_CHAR_COUNT = 120;
  const [count, setCount] = useState(
    editEvent
      ? MAX_CHAR_COUNT - editEvent.shortDescription.length
      : MAX_CHAR_COUNT
  );

  const recalculateCharacters = (event) => {
    const newCharacterCount = event.target.value.length;
    const newCount = MAX_CHAR_COUNT - newCharacterCount;
    if (newCount !== count) {
      setCount(newCount);
    }
  };

  // Handle linkURLs relation to linkDescription

  const [isLinkRequired, setIsLinkRequired] = useState(
    editEvent ? editEvent.links[0]?.linkDescription : false
  );

  function checkIfCorrespondingFieldIsRequired(event) {
    const { id, value } = event.target;
    const isInputFilled = value !== "";

    if (id === "linkDescription") {
      setIsLinkRequired(isInputFilled);
    }
  }

  // Handle image upload/preview and consent

  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(selectedImage);
  const [imagePreview, setImagePreview] = useState(
    editEvent?.image ? editEvent.image.url : null
  );
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setIsImageSelected(true);
    } else {
      setIsImageSelected(false);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setIsImageSelected(false);
  };

  // Handle address search

  const [eventLocation, setEventLocation] = useState(
    editEvent ? editEvent : {}
  );
  const [searchText, setSearchText] = useState("");
  const [searchedText, setSearchedText] = useState(
    editEvent ? turnAddressToEditIntoString(editEvent) : ""
  );
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [eventName, setEventName] = useState(editEvent?.eventName || "");

  // Handle accessibility tag selection

  const [selectedA11yTags, setSelectedA11yTags] = useState(
    editEvent?.a11yIcons || []
  );

  const handleA11yTagClick = (tagId) => {
    setSelectedA11yTags((prevTags) =>
      prevTags.includes(tagId)
        ? prevTags.filter((id) => id !== tagId)
        : [...prevTags, tagId]
    );
  };

  // Submitting the form

  const handleSubmit = async (
    event,
    onSubmit,
    selectedImage,
    editEvent,
    eventLocation
  ) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const formData = Object.fromEntries(data);
    formData.category = selectedCategory;

    if (!formData.category) {
      formData.category = categories[0]?._id || "";
    }

    formData.subCategories = selectedSubCategories;
    let eventData;
    const { location } = eventLocation;

    if (selectedImage) {
      const uploadedImage = await upload(selectedImage);
      eventData = {
        ...createEventObject(formData, location, selectedA11yTags),
        image: uploadedImage,
      };
      if (
        editEvent &&
        editEvent?.image.url !== "" &&
        uploadedImage.public_id !== editEvent?.image.public_id
      ) {
        deleteImageFromCloudinary(editEvent.image.public_id);
      }
    } else if (!editEvent) {
      eventData = {
        ...createEventObject(formData, location, selectedA11yTags),
        image: {
          url: "",
          public_id: "",
        },
      };
    } else if (!imagePreview && editEvent.image.public_id !== "") {
      deleteImageKeyFromDB(editEvent._id);
      deleteImageFromCloudinary(editEvent.image.public_id);
      eventData = {
        ...createEventObject(formData, location, selectedA11yTags),
        image: {
          url: "",
          public_id: "",
        },
      };
    } else {
      eventData = {
        ...createEventObject(formData, location, selectedA11yTags),
        image: editEvent.image,
      };
    }

    const newEventID = await onSubmit(eventData);
    event.target.reset();
    router.push(
      editEvent ? `/events/${editEvent._id}` : `/events/${newEventID}`
    );
  };

  function createEventObject(formData, location, selectedA11yTags) {
    return {
      isFetchedEvent: false,
      createdBy: userID,
      eventName: formData.eventName,
      start: {
        date: formData.startDate,
        time: formData.startTime,
      },
      end: {
        date: formData.endDate,
        time: formData.endTime,
      },
      location: {
        street: location?.street || "",
        houseNumber: location?.houseNumber || "",
        zip: location?.zip || "",
        city: location?.city,
        latitude: location?.latitude || "",
        longitude: location?.longitude || "",
      },
      category: formData.category,
      subCategories: formData.subCategories,
      organization: {
        organizationName: formData.organization,
        organizationContact: formData.contact,
      },
      costs: formData.costs || "Kostenlos",
      shortDescription: formData.shortDescription,
      longDescription: formData.longDescription,
      links: [
        {
          url: formData.linkURL,
          linkDescription: formData.linkDescription,
        },
      ],
      a11yIcons: selectedA11yTags,
    };
  }

  const handleCancel = () => {
    router.push("/");
  };

  return {
    selectedCategory,
    subCategories,
    selectedSubCategories,
    isFreeOfCharge,
    setIsFreeOfCharge,
    costs,
    setCosts,
    count,
    recalculateCharacters,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedImage,
    setSelectedImage,
    isImageSelected,
    setIsImageSelected,
    imagePreview,
    setImagePreview,
    isConsentChecked,
    setIsConsentChecked,
    selectedA11yTags,
    submitAttempted,
    setSubmitAttempted,
    handleCategoryChange,
    handleSubCategoryTagClick,
    handleStartDateChange,
    handleEndDateChange,
    handleCostsChange,
    handleImageChange,
    handleDeleteImage,
    handleA11yTagClick,
    handleSubmit,
    handleCancel,
    MAX_CHAR_COUNT,
    isLinkRequired,
    checkIfCorrespondingFieldIsRequired,
    eventLocation,
    setEventLocation,
    searchText,
    setSearchText,
    searchedText,
    setSearchedText,
    selectedAddress,
    setSelectedAddress,
    eventName,
    setEventName,
  };
}
